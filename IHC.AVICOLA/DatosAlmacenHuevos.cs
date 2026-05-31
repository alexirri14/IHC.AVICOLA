using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IHC.AVICOLA
{
    public static class DatosAlmacenHuevos
    {
        public static event EventHandler StockActualizado;

        public static int StockTotal { get; private set; } = 0;

        public static DataTable Movimientos { get; private set; }

        static DatosAlmacenHuevos()
        {
            Movimientos = new DataTable();
            Movimientos.Columns.Add("ID", typeof(int));
            Movimientos.Columns.Add("Fecha", typeof(DateTime));
            Movimientos.Columns.Add("Galpón Origen", typeof(string));
            Movimientos.Columns.Add("Cantidad", typeof(int));
            Movimientos.Columns.Add("Responsable", typeof(string));
        }

        public static void RegistrarMovimientoProduccion(string galpon, int cantidad, DateTime fecha)
        {
            if (cantidad == 0)
            {
                return;
            }

            StockTotal += cantidad;

            int nuevoId = Movimientos.Rows.Count + 1;

            Movimientos.Rows.Add(
                nuevoId,
                fecha,
                "Galpón " + galpon,
                cantidad,
                "Producción"
            );

            StockActualizado?.Invoke(null, EventArgs.Empty);
        }

        public static void RegistrarIngresoManual(string galpon, int cantidad, string responsable)
        {
            if (cantidad <= 0)
            {
                return;
            }

            StockTotal += cantidad;

            int nuevoId = Movimientos.Rows.Count + 1;

            Movimientos.Rows.Add(
                nuevoId,
                DateTime.Now,
                galpon,
                cantidad,
                responsable
            );

            StockActualizado?.Invoke(null, EventArgs.Empty);
        }

        public static int ObtenerHuevosHoy()
        {
            int total = 0;

            foreach (DataRow row in Movimientos.Rows)
            {
                DateTime fecha = Convert.ToDateTime(row["Fecha"]);
                string responsable = row["Responsable"].ToString();

                if (fecha.Date == DateTime.Today && responsable == "Producción")
                {
                    total += Convert.ToInt32(row["Cantidad"]);
                }
            }

            return total;
        }

        public static int ObtenerPromedioPorGalpon()
        {
            int cantidadGalpones = 4;

            if (cantidadGalpones == 0)
            {
                return 0;
            }

            return ObtenerHuevosHoy() / cantidadGalpones;
        }
    }
}

