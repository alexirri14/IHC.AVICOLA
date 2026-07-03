using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace IHC.AVICOLA
{
    public static class DataManager
    {
        // Eventos para notificar cambios
        public static event EventHandler DatosActualizados;

        // ========== DATOS DE PRODUCCIÓN ==========
        public static DataTable Produccion { get; private set; }
        public static Dictionary<string, Dictionary<string, double>> FormulasMolino { get; private set; }

        // ========== DATOS DE VENTAS ==========
        public static DataTable Ventas { get; private set; }

        // ========== DATOS DE ALMACÉN HUEVOS ==========
        public static DataTable AlmacenHuevos { get; private set; }
        public static int StockHuevos { get; private set; }

        // ========== DATOS DE ALIMENTO ==========
        public static Dictionary<string, int> StockAlimento { get; private set; }
        public static DataTable ConsumoAlimento { get; private set; }

        static DataManager()
        {
            InicializarDatos();
        }

        private static void InicializarDatos()
        {
            // --- Inicializar Producción ---
            Produccion = new DataTable();
            Produccion.Columns.Add("ID", typeof(int));
            Produccion.Columns.Add("Fecha", typeof(DateTime));
            Produccion.Columns.Add("Galpón", typeof(string));
            Produccion.Columns.Add("Cantidad", typeof(int));
            // Datos de ejemplo
            Produccion.Rows.Add(1, new DateTime(2026, 1, 1), "Galpón A", 300);
            Produccion.Rows.Add(2, new DateTime(2026, 1, 1), "Galpón B", 250);
            Produccion.Rows.Add(3, new DateTime(2026, 1, 1), "Galpón C", 280);
            Produccion.Rows.Add(4, new DateTime(2026, 1, 1), "Galpón D", 320);
            Produccion.Rows.Add(5, new DateTime(2026, 1, 2), "Galpón A", 310);
            Produccion.Rows.Add(6, new DateTime(2026, 1, 2), "Galpón B", 260);

            // --- Inicializar Formulas Molino ---
            FormulasMolino = new Dictionary<string, Dictionary<string, double>>
            {
                {
                    "GALPON 4 (POSTURA 1) - 839/154",
                    new Dictionary<string, double>
                    {
                        {"MAIZ", 839}, {"HARINA DE SOYA", 154}, {"PALMISTE", 98},
                        {"CAL FINA", 48}, {"CAL GRUESO", 103}, {"ACEITE DE SOYA", 45},
                        {"SAL INDUSTRIAL", 4.2}, {"PHOSBIC", 9.0}, {"PRE POSTURA", 1.5},
                        {"METIONINA", 3.6}, {"LISINA", 1.8}, {"BIO+COLINA", 0.45},
                        {"BICARBONATO", 4.0}, {"MICOFIX 300", 0.4}, {"SECUESTRANTE", 2.5},
                        {"TOXONINA", 0.6}, {"LIPIOSA", 1.0}, {"ADITRACE", 0.15}
                    }
                },
                {
                    "GALPON (6-8GT) (POSTURA 2) - 907/182",
                    new Dictionary<string, double>
                    {
                        {"MAIZ", 907}, {"HARINA DE SOYA", 182}, {"PALMISTE", 94},
                        {"CAL GRUESO", 30}, {"ACEITE DE SOYA", 126}, {"SAL INDUSTRIAL", 5},
                        {"PHOSBIC", 7.5}, {"PRE POSTURA", 1.5}, {"METIONINA", 3.8},
                        {"LISINA", 1.8}, {"BIO+COLINA", 0.15}, {"BICARBONATO", 4.5},
                        {"MICOFIX 300", 0.4}, {"SECUESTRANTE", 2.5}, {"TOXONINA", 0.5},
                        {"LIPIOSA", 0.15}, {"ADITRACE", 0.15}
                    }
                },
                {
                    "GALPON (3-5-8) (POSTURA 3) - 949/217",
                    new Dictionary<string, double>
                    {
                        {"MAIZ", 949}, {"HARINA DE SOYA", 217}, {"SOYA INTEGRAL", 370},
                        {"PHOSBIC", 91}, {"CAL GRUESO", 30}, {"ACEITE DE SOYA", 135},
                        {"SAL INDUSTRIAL", 5.2}, {"PRE POSTURA", 1.5}, {"METIONINA", 3.1},
                        {"LISINA", 2.1}, {"BIO+COLINA", 0.45}, {"BICARBONATO", 3.75},
                        {"MICOFIX 300", 0.4}, {"SECUESTRANTE", 2.5}, {"TOXONINA", 0.45},
                        {"LIPIOSA", 0.13}, {"ADITRACE", 0.15}
                    }
                }
            };

            // --- Inicializar Ventas ---
            Ventas = new DataTable();
            Ventas.Columns.Add("ID", typeof(int));
            Ventas.Columns.Add("Fecha", typeof(DateTime));
            Ventas.Columns.Add("Cliente", typeof(string));
            Ventas.Columns.Add("Cantidad", typeof(int));
            Ventas.Columns.Add("PrecioUnitario", typeof(decimal));
            Ventas.Columns.Add("Total", typeof(decimal));

  
            //Almacen huevos
            AlmacenHuevos = new DataTable();
            AlmacenHuevos.Columns.Add("ID", typeof(int));
            AlmacenHuevos.Columns.Add("Fecha", typeof(DateTime));
            AlmacenHuevos.Columns.Add("Galpón Origen", typeof(string));
            AlmacenHuevos.Columns.Add("Cantidad", typeof(int));
            AlmacenHuevos.Columns.Add("Responsable", typeof(string));

            // --- Inicializar Stock Alimento ---
            StockAlimento = new Dictionary<string, int>
            {
                {"MAIZ", 100}, {"HARINA DE SOYA", 50}, {"SOYA INTEGRAL", 30},
                {"PALMISTE", 15}, {"CAL FINA", 25}, {"CAL GRUESO", 35},
                {"ACEITE DE SOYA", 20}, {"SAL INDUSTRIAL", 10}, {"PHOSBIC", 8},
                {"PRE POSTURA", 3}, {"METIONINA", 2}, {"LISINA", 2},
                {"BIO+COLINA", 1}, {"BICARBONATO", 5}, {"MICOFIX 300", 1},
                {"SECUESTRANTE", 2}, {"TOXONINA", 1}, {"LIPIOSA", 1},
                {"ADITRACE", 1}
            };

            ConsumoAlimento = new DataTable();
            ConsumoAlimento.Columns.Add("ID", typeof(int));
            ConsumoAlimento.Columns.Add("Fecha", typeof(DateTime));
            ConsumoAlimento.Columns.Add("Formula", typeof(string));
            ConsumoAlimento.Columns.Add("CantidadProducidaKg", typeof(double));
        }

        public static void NotificarCambios()
        {
            DatosActualizados?.Invoke(null, EventArgs.Empty);
        }

        // ====== MÉTODOS PARA PRODUCCIÓN ======
        public static void RegistrarProduccion(string galpon, int cantidad, DateTime fecha)
        {
            int nuevoId = Produccion.Rows.Count + 1;
            Produccion.Rows.Add(nuevoId, fecha, galpon, cantidad);
            StockHuevos += cantidad;
            
            // También registramos el movimiento en AlmacenHuevos
            int nuevoIdAlmacen = AlmacenHuevos.Rows.Count + 1;
            AlmacenHuevos.Rows.Add(nuevoIdAlmacen, fecha, galpon, cantidad, "Producción");
            
            NotificarCambios();
        }

        // ====== MÉTODOS PARA VENTAS ======
        public static void RegistrarVenta(string cliente, int cantidad, decimal precioUnitario)
        {
            decimal total = cantidad * precioUnitario;
            int nuevoId = Ventas.Rows.Count + 1;
            Ventas.Rows.Add(nuevoId, DateTime.Today, cliente, cantidad, precioUnitario, total);
            StockHuevos -= cantidad;
            NotificarCambios();
        }

        public static decimal ObtenerTotalVentas()
        {
            decimal total = 0;
            foreach (DataRow row in Ventas.Rows)
            {
                if (row["Total"] != DBNull.Value)
                    total += Convert.ToDecimal(row["Total"]);
            }
            return total;
        }

        // ====== MÉTODOS PARA ALMACÉN HUEVOS ======
        public static void RegistrarIngresoHuevos(string galpon, int cantidad, string responsable)
        {
            int nuevoId = AlmacenHuevos.Rows.Count + 1;
            AlmacenHuevos.Rows.Add(nuevoId, DateTime.Now, galpon, cantidad, responsable);
            StockHuevos += cantidad;
            NotificarCambios();
        }

        // ====== MÉTODOS PARA ALIMENTO ======
        public static void ActualizarStockAlimento(string insumo, int cantidad)
        {
            if (StockAlimento.ContainsKey(insumo))
                StockAlimento[insumo] = Math.Max(0, StockAlimento[insumo] + cantidad);
        }

        public static int ObtenerStockAlimento(string insumo)
        {
            return StockAlimento.TryGetValue(insumo, out int stock) ? stock : 0;
        }

        // ====== MÉTODOS PARA MOLINO ======
        public static void RegistrarProduccionAlimento(string formula, double cantidadKg)
        {
            int nuevoId = ConsumoAlimento.Rows.Count + 1;
            ConsumoAlimento.Rows.Add(nuevoId, DateTime.Now, formula, cantidadKg);
            // Aquí se podría actualizar el stock de insumos
            NotificarCambios();
        }

        // ====== MÉTODOS PARA REPORTES ======
        public static Dictionary<string, int> ObtenerProduccionPorGalpon()
        {
            var resultado = new Dictionary<string, int>
            {
                {"Galpón A", 0}, {"Galpón B", 0}, {"Galpón C", 0}, {"Galpón D", 0}
            };

            foreach (DataRow row in Produccion.Rows)
            {
                string galpon = row["Galpón"].ToString();
                int cantidad = Convert.ToInt32(row["Cantidad"]);
                if (resultado.ContainsKey(galpon))
                    resultado[galpon] += cantidad;
            }
            return resultado;
        }

        public static Dictionary<string, decimal> ObtenerVentasDiarias()
        {
            var resultado = new Dictionary<string, decimal>
            {
                {"Lun", 850}, {"Mar", 920}, {"Mié", 780}, {"Jue", 1120}, {"Vie", 1200}, {"Sáb", 950}, {"Dom", 580}
            };
            return resultado;
        }

        public static int ObtenerStockAlimentoSacos()
        {
            return 100 + 50 + 30 + 15 + 25 + 35;
        }

        public static int ObtenerHuevosHoy()
        {
            int total = 0;
            foreach (DataRow row in Produccion.Rows)
            {
                DateTime fecha = Convert.ToDateTime(row["Fecha"]);
                if (fecha.Date == DateTime.Today)
                {
                    total += Convert.ToInt32(row["Cantidad"]);
                }
            }
            if (total == 0)
            {
                foreach (DataRow row in Produccion.Rows)
                {
                    total += Convert.ToInt32(row["Cantidad"]);
                }
                total = total / Produccion.Rows.Count; // Producción por Día
            }
            return total;
        }

        public static int ObtenerPromedioPorGalpon()
        {
            var produccion = ObtenerProduccionPorGalpon();
            int total = 0;
            foreach (var valor in produccion.Values)
            {
                total += valor;
            }
            return total / produccion.Count;
        }
    }
}
