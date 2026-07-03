using System;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public partial class DashboardUserControl : UserControl
    {
        public DashboardUserControl()
        {
            InitializeComponent();
            ConfigurarEventos();
        }

        private void ConfigurarEventos()
        {
            DataManager.DatosActualizados += OnDatosActualizados;
            this.Load += DashboardUserControl_Load;
            this.Disposed += DashboardUserControl_Disposed;
        }

        private void DashboardUserControl_Load(object sender, EventArgs e)
        {
            ActualizarDashboard();
        }

        private void OnDatosActualizados(object sender, EventArgs e)
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
            int huevosHoy = DataManager.ObtenerHuevosHoy();
            int stockActual = DataManager.StockHuevos;
            int promedioGalpon = DataManager.ObtenerPromedioPorGalpon();
            
            lblHuevosVal.Text = huevosHoy.ToString("N0");
            lblStockVal.Text = stockActual.ToString("N0");
            lblPromedio.Text = $"{promedioGalpon} huevos";
            
            decimal totalVentas = DataManager.ObtenerTotalVentas();
            lblVentasVal.Text = $"S/ {totalVentas:0.00}";
            
            int stockAlimento = DataManager.ObtenerStockAlimentoSacos();
            lblAlimentoVal.Text = $"{stockAlimento} sacos";
            
            lblConsumo.Text = "0 sacos";
            
            double tasaProduccion = stockActual > 0 ? 100.0 : 0;
            lblTasa.Text = $"{tasaProduccion:F0}%";
            
            ActualizarAlertas(stockActual);
        }

        private void ActualizarAlertas(int stockActual)
        {
            if (stockActual <= 0)
            {
                lblAlerta1.Text = "No hay stock de huevos";
                lblAlerta1.Visible = true;
            }
            else if (stockActual < 100)
            {
                lblAlerta1.Text = "Bajo stock de huevos";
                lblAlerta1.Visible = true;
            }
            else
            {
                lblAlerta1.Visible = false;
            }
        }

        private void DashboardUserControl_Disposed(object sender, EventArgs e)
        {
            DataManager.DatosActualizados -= OnDatosActualizados;
        }
    }
}
