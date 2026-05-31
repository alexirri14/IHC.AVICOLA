using System;
using System.Data;
using System.Drawing;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public partial class VentasUserControl : UserControl
    {
        private DataTable _dtHistorial;

        public VentasUserControl()
        {
            InitializeComponent();
            InicializarDatos();
            ConfigurarEventos();
            this.Load += VentasUserControl_Load;
            this.Resize += VentasUserControl_Resize;
        }

        private void VentasUserControl_Load(object sender, EventArgs e)
        {
            AjustarPaneles();
        }

        private void VentasUserControl_Resize(object sender, EventArgs e)
        {
            AjustarPaneles();
        }

        private void AjustarPaneles()
        {
            int padding = pnlMain.Padding.Left + pnlMain.Padding.Right;
            int anchoDisponible = pnlMain.ClientSize.Width - padding;

            pnlTitulo.Width = anchoDisponible;
            pnlForm.Width = anchoDisponible;
            pnlHistorial.Width = anchoDisponible;

            pnlForm.Location = new System.Drawing.Point(pnlMain.Padding.Left, pnlTitulo.Bottom + 20);
            pnlHistorial.Location = new System.Drawing.Point(pnlMain.Padding.Left, pnlForm.Bottom + 20);

            dgvHistorial.Height = pnlHistorial.ClientSize.Height - pnlHistorial.Padding.Top - pnlHistorial.Padding.Bottom - 75;

            int alturaTotalContenido = pnlHistorial.Bottom + pnlMain.Padding.Bottom;
            pnlMain.AutoScrollMinSize = new System.Drawing.Size(0, alturaTotalContenido);
        }

        private void InicializarDatos()
        {
            _dtHistorial = new DataTable();
            _dtHistorial.Columns.Add("ID", typeof(int));
            _dtHistorial.Columns.Add("Fecha", typeof(DateTime));
            _dtHistorial.Columns.Add("Cliente", typeof(string));
            _dtHistorial.Columns.Add("Cantidad", typeof(int));
            _dtHistorial.Columns.Add("Total", typeof(decimal));

            _dtHistorial.Rows.Add(1, DateTime.Now.AddDays(-2), "Juan Pérez", 500, 750.00m);
            _dtHistorial.Rows.Add(2, DateTime.Now.AddDays(-1), "María López", 300, 450.00m);
            _dtHistorial.Rows.Add(3, DateTime.Now, "Carlos Ruiz", 400, 600.00m);

            dgvHistorial.DataSource = _dtHistorial;
            ConfigurarDataGridView();
        }

        private void ConfigurarDataGridView()
        {
            dgvHistorial.EnableHeadersVisualStyles = false;
            dgvHistorial.ColumnHeadersDefaultCellStyle.BackColor = Color.Teal;
            dgvHistorial.ColumnHeadersDefaultCellStyle.ForeColor = Color.White;
            dgvHistorial.ColumnHeadersDefaultCellStyle.Font = new Font("Segoe UI", 10, FontStyle.Bold);
            dgvHistorial.DefaultCellStyle.SelectionBackColor = Color.LightSeaGreen;
            dgvHistorial.DefaultCellStyle.SelectionForeColor = Color.White;
            dgvHistorial.AlternatingRowsDefaultCellStyle.BackColor = Color.FromArgb(245, 245, 245);
            dgvHistorial.BorderStyle = BorderStyle.None;
            dgvHistorial.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
        }

        private void ConfigurarEventos()
        {
            btnGuardar.Click += BtnGuardar_Click;
            btnCancelar.Click += BtnCancelar_Click;
            txtCantidad.KeyPress += TxtCantidad_KeyPress;
        }

        private void TxtCantidad_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar))
                e.Handled = true;
        }

        private void BtnCancelar_Click(object sender, EventArgs e)
        {
            txtCliente.Clear();
            txtCantidad.Clear();
        }

        private void BtnGuardar_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(txtCliente.Text) && !string.IsNullOrWhiteSpace(txtCantidad.Text))
            {
                int nuevoId = _dtHistorial.Rows.Count + 1;
                decimal total = int.Parse(txtCantidad.Text) * 1.50m;
                _dtHistorial.Rows.Add(nuevoId, DateTime.Now, txtCliente.Text, int.Parse(txtCantidad.Text), total);
                MessageBox.Show("Venta registrada correctamente!", "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
                BtnCancelar_Click(sender, e);
            }
        }
    }
}
