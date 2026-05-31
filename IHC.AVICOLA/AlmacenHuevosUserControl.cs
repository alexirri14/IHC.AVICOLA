using System;
using System.Data;
using System.Drawing;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public partial class AlmacenHuevosUserControl : UserControl
    {
        private int _stockTotal = 9590;
        private DataTable _dtMovimientos;

        public AlmacenHuevosUserControl()
        {
            InitializeComponent();
            InicializarDatos();
            ConfigurarEventos();
            this.Load += AlmacenHuevosUserControl_Load;
            this.Resize += AlmacenHuevosUserControl_Resize;
        }

        private void AlmacenHuevosUserControl_Load(object sender, EventArgs e)
        {
            AjustarPaneles();
        }

        private void AlmacenHuevosUserControl_Resize(object sender, EventArgs e)
        {
            AjustarPaneles();
        }

        private void AjustarPaneles()
        {
            int padding = pnlMainContainer.Padding.Left + pnlMainContainer.Padding.Right;
            int anchoDisponible = pnlMainContainer.ClientSize.Width - padding;

            pnlResumen.Width = anchoDisponible;
            pnlFormMovimiento.Width = anchoDisponible;
            pnlMovimientos.Width = anchoDisponible;

            pnlFormMovimiento.Location = new System.Drawing.Point(pnlMainContainer.Padding.Left, pnlResumen.Bottom + 20);
            pnlMovimientos.Location = new System.Drawing.Point(pnlMainContainer.Padding.Left, pnlFormMovimiento.Bottom + 20);

            dgvMovimientos.Height = pnlMovimientos.ClientSize.Height - pnlMovimientos.Padding.Top - pnlMovimientos.Padding.Bottom - 75;

            int alturaTotalContenido = pnlMovimientos.Bottom + pnlMainContainer.Padding.Bottom;
            pnlMainContainer.AutoScrollMinSize = new System.Drawing.Size(0, alturaTotalContenido);
        }

        private void InicializarDatos()
        {
            // Crear DataTable para ingresos desde galpón
            _dtMovimientos = new DataTable();
            _dtMovimientos.Columns.Add("ID", typeof(int));
            _dtMovimientos.Columns.Add("Fecha", typeof(DateTime));
            _dtMovimientos.Columns.Add("Galpón Origen", typeof(string));
            _dtMovimientos.Columns.Add("Cantidad", typeof(int));
            _dtMovimientos.Columns.Add("Responsable", typeof(string));

            // Agregar datos de ejemplo
            _dtMovimientos.Rows.Add(1, DateTime.Now.AddDays(-2), "Galpón A", 1500, "Juan Pérez");
            _dtMovimientos.Rows.Add(2, DateTime.Now.AddDays(-1), "Galpón B", 1400, "María López");
            _dtMovimientos.Rows.Add(3, DateTime.Now, "Galpón C", 1200, "Carlos Ruiz");

            // Asignar a DataGridView
            dgvMovimientos.DataSource = _dtMovimientos;
            ConfigurarDataGridView();
            ActualizarResumen();
        }

        private void ConfigurarDataGridView()
        {
            dgvMovimientos.EnableHeadersVisualStyles = false;
            dgvMovimientos.ColumnHeadersDefaultCellStyle.BackColor = Color.Teal;
            dgvMovimientos.ColumnHeadersDefaultCellStyle.ForeColor = Color.White;
            dgvMovimientos.ColumnHeadersDefaultCellStyle.Font = new Font("Segoe UI", 10, FontStyle.Bold);
            dgvMovimientos.DefaultCellStyle.SelectionBackColor = Color.LightSeaGreen;
            dgvMovimientos.DefaultCellStyle.SelectionForeColor = Color.White;
            dgvMovimientos.AlternatingRowsDefaultCellStyle.BackColor = Color.FromArgb(245, 245, 245);
            dgvMovimientos.BorderStyle = BorderStyle.None;
            dgvMovimientos.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
        }

        private void ConfigurarEventos()
        {
            btnGuardar.Click += BtnGuardar_Click;
            btnCancelar.Click += BtnCancelar_Click;
            txtCantidadMov.KeyPress += TxtCantidad_KeyPress;
        }

        private void TxtCantidad_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar))
                e.Handled = true;
        }

        private void BtnCancelar_Click(object sender, EventArgs e)
        {
            cboGalpon.SelectedIndex = -1;
            txtCantidadMov.Clear();
            lblError.Visible = false;
        }

        private void BtnGuardar_Click(object sender, EventArgs e)
        {
            if (ValidarCampos())
            {
                int cantidad = int.Parse(txtCantidadMov.Text);
                string galpon = cboGalpon.SelectedItem.ToString();

                // Actualizar stock
                _stockTotal += cantidad;

                // Agregar movimiento de ingreso desde galpón
                int nuevoId = _dtMovimientos.Rows.Count + 1;
                _dtMovimientos.Rows.Add(nuevoId, DateTime.Now, galpon, cantidad, "Usuario Actual");

                ActualizarResumen();
                MessageBox.Show("Ingreso desde galpón registrado correctamente!", "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);
                BtnCancelar_Click(sender, e);
            }
        }

        private void ActualizarResumen()
        {
            lblStock.Text = $"{_stockTotal:N0} Huevos";
            lblDisponibles.Text = $"{_stockTotal:N0} 🟢";
        }

        private bool ValidarCampos()
        {
            bool esValido = true;
            string mensajeError = "";

            if (cboGalpon.SelectedIndex == -1)
            {
                esValido = false;
                mensajeError += "⚠️ Seleccione un galpón de origen.\n";
            }

            if (string.IsNullOrWhiteSpace(txtCantidadMov.Text))
            {
                esValido = false;
                mensajeError += "⚠️ Ingrese una cantidad.\n";
            }
            else if (int.Parse(txtCantidadMov.Text) <= 0)
            {
                esValido = false;
                mensajeError += "⚠️ La cantidad debe ser mayor a 0.\n";
            }

            if (!esValido)
            {
                lblError.Text = mensajeError.Trim();
                lblError.Visible = true;
            }
            else
            {
                lblError.Visible = false;
            }

            return esValido;
        }
    }
}
