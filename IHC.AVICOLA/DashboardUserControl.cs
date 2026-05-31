using System;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public partial class DashboardUserControl : UserControl
    {
        public DashboardUserControl()
        {
            InitializeComponent();

            DatosAlmacenHuevos.StockActualizado += DatosAlmacenHuevos_StockActualizado;

            this.Load += DashboardUserControl_Load;
            this.Disposed += DashboardUserControl_Disposed;
        }

        private void DashboardUserControl_Load(object sender, EventArgs e)
        {
            ActualizarDashboard();
        }

        private void DatosAlmacenHuevos_StockActualizado(object sender, EventArgs e)
        {
            if (this.InvokeRequired)
            {
                this.Invoke(new Action(ActualizarDashboard));
            }
            else
            {
                ActualizarDashboard();
            }
        }

        private void ActualizarDashboard()
        {
            int huevosHoy = DatosAlmacenHuevos.ObtenerHuevosHoy();
            int stockActual = DatosAlmacenHuevos.StockTotal;
            int promedioGalpon = DatosAlmacenHuevos.ObtenerPromedioPorGalpon();

            lblHuevosVal.Text = huevosHoy.ToString("N0");
            lblStockVal.Text = stockActual.ToString("N0");
            lblPromedio.Text = $"{promedioGalpon:N0} huevos";

            // Estos todavía quedan fijos porque no los estamos conectando a ventas/alimento
            lblVentasVal.Text = "S/ 0";
            lblAlimentoVal.Text = "0 sacos";
            lblConsumo.Text = "0 sacos";

            // Tasa de producción opcional
            lblTasa.Text = "0%";

            ActualizarAlertas(stockActual);
        }

        private void ActualizarAlertas(int stockActual)
        {
            if (stockActual <= 0)
            {
                lblAlerta1.Text = "? No hay stock de huevos";
                lblAlerta1.Visible = true;
            }
            else if (stockActual < 100)
            {
                lblAlerta1.Text = "? Bajo stock de huevos";
                lblAlerta1.Visible = true;
            }
            else
            {
                lblAlerta1.Visible = false;
            }

            lblAlerta2.Visible = false;
        }

        private void DashboardUserControl_Disposed(object sender, EventArgs e)
        {
            DatosAlmacenHuevos.StockActualizado -= DatosAlmacenHuevos_StockActualizado;
        }
    }
}
