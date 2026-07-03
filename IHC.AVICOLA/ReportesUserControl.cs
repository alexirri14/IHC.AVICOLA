using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace IHC.AVICOLA
{
    public partial class ReportesUserControl : UserControl
    {
        public ReportesUserControl()
        {
            InitializeComponent();
            ConfigurarEventos();
            InicializarDatos();
        }

        private void ConfigurarEventos()
        {
            btnTabProduccion.Click += (s, e) => CambiarTab(0);
            btnTabVentas.Click += (s, e) => CambiarTab(1);
            btnTabStock.Click += (s, e) => CambiarTab(2);
            DataManager.DatosActualizados += OnDatosActualizados;
            this.Load += ReportesUserControl_Load;
        }

        private void ReportesUserControl_Load(object sender, EventArgs e)
        {
            CargarDatosProduccion();
            CargarDatosVentas();
            CargarDatosStock();
        }

        private void OnDatosActualizados(object sender, EventArgs e)
        {
            if (this.InvokeRequired)
            {
                this.Invoke(new Action(ActualizarTodosLosDatos));
            }
            else
            {
                ActualizarTodosLosDatos();
            }
        }

        private void ActualizarTodosLosDatos()
        {
            CargarDatosProduccion();
            CargarDatosVentas();
            CargarDatosStock();
        }

        private void CambiarTab(int tabIndex)
        {
            btnTabProduccion.BackColor = tabIndex == 0 ? Color.Teal : Color.FromArgb(240, 240, 240);
            btnTabProduccion.ForeColor = tabIndex == 0 ? Color.White : Color.FromArgb(73, 80, 87);
            
            btnTabVentas.BackColor = tabIndex == 1 ? Color.Teal : Color.FromArgb(240, 240, 240);
            btnTabVentas.ForeColor = tabIndex == 1 ? Color.White : Color.FromArgb(73, 80, 87);
            
            btnTabStock.BackColor = tabIndex == 2 ? Color.Teal : Color.FromArgb(240, 240, 240);
            btnTabStock.ForeColor = tabIndex == 2 ? Color.White : Color.FromArgb(73, 80, 87);
            
            pnlProduccion.Visible = tabIndex == 0;
            pnlVentas.Visible = tabIndex == 1;
            pnlStock.Visible = tabIndex == 2;
        }

        private void InicializarDatos()
        {
            ConfigurarDataGridView();
            CambiarTab(0);
        }

        private void ConfigurarDataGridView()
        {
            dgvProduccion.EnableHeadersVisualStyles = false;
            dgvProduccion.ColumnHeadersDefaultCellStyle.BackColor = Color.FromArgb(245, 245, 245);
            dgvProduccion.ColumnHeadersDefaultCellStyle.ForeColor = Color.FromArgb(73, 80, 87);
            dgvProduccion.ColumnHeadersDefaultCellStyle.Font = new Font("Segoe UI", 10, FontStyle.Bold);
            dgvProduccion.DefaultCellStyle.SelectionBackColor = Color.LightSeaGreen;
            dgvProduccion.DefaultCellStyle.SelectionForeColor = Color.White;
            dgvProduccion.AlternatingRowsDefaultCellStyle.BackColor = Color.White;
            dgvProduccion.BorderStyle = BorderStyle.None;
            dgvProduccion.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
        }

        private void CargarDatosProduccion()
        {
            var produccionPorGalpon = new Dictionary<string, int>
            {
                { "Galpón A", 0 },
                { "Galpón B", 0 },
                { "Galpón C", 0 },
                { "Galpón D", 0 }
            };

            foreach (DataRow row in DataManager.Produccion.Rows)
            {
                string galpon = row["Galpón"].ToString();
                if (produccionPorGalpon.ContainsKey(galpon))
                {
                    produccionPorGalpon[galpon] += Convert.ToInt32(row["Cantidad"]);
                }
            }

            DataTable dt = new DataTable();
            dt.Columns.Add("Galpón", typeof(string));
            dt.Columns.Add("Producción Diaria", typeof(int));
            dt.Columns.Add("Producción Semanal", typeof(int));
            dt.Columns.Add("Promedio", typeof(string));

            foreach (var galpon in produccionPorGalpon.Keys)
            {
                int total = produccionPorGalpon[galpon];
                int diaria = total > 0 ? total / 2 : 0;
                int promedio = total > 0 ? total / 7 : 0;
                dt.Rows.Add(galpon, diaria, total, $"{promedio} huevos/día");
            }
            dgvProduccion.DataSource = dt;

            chartProduccion.Series["Huevos del día"].Points.Clear();
            chartProduccion.Series["Huevos semanal"].Points.Clear();
            
            foreach (DataRow row in dt.Rows)
            {
                string galpon = row["Galpón"].ToString();
                int diaria = Convert.ToInt32(row["Producción Diaria"]);
                int semanal = Convert.ToInt32(row["Producción Semanal"]);
                
                chartProduccion.Series["Huevos del día"].Points.AddXY(galpon, diaria);
                chartProduccion.Series["Huevos semanal"].Points.AddXY(galpon, semanal);
            }

            chartProduccion.Series["Huevos del día"].ChartType = SeriesChartType.Column;
            chartProduccion.Series["Huevos semanal"].ChartType = SeriesChartType.Column;
        }

        private void CargarDatosVentas()
        {
            decimal totalVentas = DataManager.ObtenerTotalVentas();
            lblTotalSemanal.Text = $"S/ {totalVentas:0.00}";

            var ventasDiarias = DataManager.ObtenerVentasDiarias();
            decimal promedio = totalVentas / 7;
            lblPromedioDiario.Text = $"S/ {promedio:0.00}";

            decimal mejorDia = 0;
            foreach (var valor in ventasDiarias.Values)
            {
                if (valor > mejorDia) mejorDia = valor;
            }
            lblMejorDia.Text = $"S/ {mejorDia:0.00}";

            // Poblar gráfico de ventas
            chartVentas.Series["Ventas (S/)"].Points.Clear();
            chartVentas.Series["Ventas (S/)"].ChartType = SeriesChartType.Line;
            
            foreach (var kvp in ventasDiarias)
            {
                chartVentas.Series["Ventas (S/)"].Points.AddXY(kvp.Key, kvp.Value);
            }

            // Configurar el gráfico para que se vea mejor
            chartVentas.ChartAreas[0].AxisY.Title = "Ventas (S/)";
            chartVentas.ChartAreas[0].AxisX.Title = "Día de la semana";
            chartVentas.ChartAreas[0].AxisX.Interval = 1;
        }

        private void CargarDatosStock()
        {
            lblHuevosStock.Text = DataManager.StockHuevos.ToString("N0");
            lblAlimentoStock.Text = DataManager.ObtenerStockAlimentoSacos() + " sacos";

            // Poblar gráfico de stock
            chartStock.Series[0].Points.Clear();
            chartStock.Series[0].ChartType = SeriesChartType.Pie;
            
            int huevos = DataManager.StockHuevos;
            int alimento = DataManager.ObtenerStockAlimentoSacos();
            
            chartStock.Series[0].Points.AddXY("Huevos", huevos);
            chartStock.Series[0].Points.AddXY("Alimento", alimento);
            chartStock.Series[0].Points[0].Color = Color.Teal;
            chartStock.Series[0].Points[1].Color = Color.FromArgb(255, 140, 0);
        }
    }
}
