using System;
using System.Data;
using System.Drawing;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public partial class VentasUserControl : UserControl
    {
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

            if (pnlRegistro != null)
                pnlRegistro.Width = anchoDisponible;
            if (pnlHistorial != null)
                pnlHistorial.Width = anchoDisponible;

            if (pnlHistorial != null && pnlRegistro != null)
                pnlHistorial.Location = new Point(pnlMain.Padding.Left, pnlRegistro.Bottom + 20);

            int alturaTotalContenido = 0;
            if (pnlHistorial != null)
                alturaTotalContenido = pnlHistorial.Bottom + pnlMain.Padding.Bottom;
            pnlMain.AutoScrollMinSize = new Size(0, alturaTotalContenido);
        }

        private void InicializarDatos()
        {
            dgvHistorial.DataSource = DataManager.Ventas;
            ConfigurarDataGridView();
            CalcularTotalVentas();

            txtPrecioUnitario.Text = "0.40";
        }

        private void ConfigurarDataGridView()
        {
            dgvHistorial.EnableHeadersVisualStyles = false;
            dgvHistorial.ColumnHeadersDefaultCellStyle.BackColor = Color.FromArgb(245, 245, 245);
            dgvHistorial.ColumnHeadersDefaultCellStyle.ForeColor = Color.FromArgb(73, 80, 87);
            dgvHistorial.ColumnHeadersDefaultCellStyle.Font = new Font("Segoe UI", 10, FontStyle.Bold);
            dgvHistorial.DefaultCellStyle.SelectionBackColor = Color.LightSeaGreen;
            dgvHistorial.DefaultCellStyle.SelectionForeColor = Color.White;
            dgvHistorial.AlternatingRowsDefaultCellStyle.BackColor = Color.White;
            dgvHistorial.BorderStyle = BorderStyle.None;
            dgvHistorial.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;

            if (dgvHistorial.Columns["ID"] != null)
                dgvHistorial.Columns["ID"].Visible = false;
            if (dgvHistorial.Columns["PrecioUnitario"] != null)
                dgvHistorial.Columns["PrecioUnitario"].HeaderText = "P. Unit.";

            if (dgvHistorial.Columns["PrecioUnitario"] != null)
                dgvHistorial.Columns["PrecioUnitario"].DefaultCellStyle.Format = "0.00";
            if (dgvHistorial.Columns["Total"] != null)
                dgvHistorial.Columns["Total"].DefaultCellStyle.Format = "0.00";
        }

        private void ConfigurarEventos()
        {
            btnRegistrar.Click += BtnRegistrar_Click;
            txtCantidad.TextChanged += TxtValores_TextChanged;
            txtPrecioUnitario.TextChanged += TxtValores_TextChanged;
            txtCantidad.KeyPress += TxtNumeros_KeyPress;
            txtPrecioUnitario.KeyPress += TxtPrecio_KeyPress;
        }

        private void TxtNumeros_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar))
                e.Handled = true;
        }

        private void TxtPrecio_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar) && e.KeyChar != '.')
                e.Handled = true;
        }

        private void TxtValores_TextChanged(object sender, EventArgs e)
        {
            ActualizarTotalFormulario();
        }

        private void ActualizarTotalFormulario()
        {
            int cantidad = 0;
            decimal precioUnitario = 0;

            int.TryParse(txtCantidad.Text, out cantidad);
            decimal.TryParse(txtPrecioUnitario.Text, out precioUnitario);

            decimal total = cantidad * precioUnitario;
            lblTotal.Text = $"Total: S/ {total:0.00}";
        }

        private void BtnRegistrar_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtCliente.Text))
            {
                MessageBox.Show("Por favor ingrese el nombre del cliente.", "Advertencia", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            if (!int.TryParse(txtCantidad.Text, out int cantidad) || cantidad <= 0)
            {
                MessageBox.Show("Por favor ingrese una cantidad válida.", "Advertencia", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            if (!decimal.TryParse(txtPrecioUnitario.Text, out decimal precioUnitario) || precioUnitario <= 0)
            {
                MessageBox.Show("Por favor ingrese un precio unitario válido.", "Advertencia", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // Registrar la venta en el DataManager
            DataManager.RegistrarVenta(txtCliente.Text, cantidad, precioUnitario);
            
            CalcularTotalVentas();
            MessageBox.Show("Venta registrada correctamente!", "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
            LimpiarFormulario();
        }

        private void LimpiarFormulario()
        {
            txtCliente.Clear();
            txtCantidad.Clear();
            txtPrecioUnitario.Text = "0.40";
            lblTotal.Text = "Total: S/ 0.00";
        }

        private void CalcularTotalVentas()
        {
            decimal total = DataManager.ObtenerTotalVentas();
            lblTotalVentas.Text = $"S/ {total:0.00}";
        }
    }
}
