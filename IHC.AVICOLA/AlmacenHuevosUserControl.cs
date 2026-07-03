using System;
using System.Data;
using System.Drawing;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public partial class AlmacenHuevosUserControl : UserControl
    {
        private DataTable _dtMovimientos;

        public AlmacenHuevosUserControl()
        {
            InitializeComponent();
            InicializarDatos();
            CargarGalpones();
            ConfigurarEventos();

            DataManager.DatosActualizados += DataManager_DatosActualizados;

            this.Load += AlmacenHuevosUserControl_Load;
            this.Resize += AlmacenHuevosUserControl_Resize;
        }

        private void AlmacenHuevosUserControl_Load(object sender, EventArgs e)
        {
            AjustarPaneles();
            ActualizarResumen();
        }

        private void AlmacenHuevosUserControl_Resize(object sender, EventArgs e)
        {
            AjustarPaneles();
        }

        private void DataManager_DatosActualizados(object sender, EventArgs e)
        {
            dgvMovimientos.Refresh();
            ActualizarResumen();
        }

        private void AjustarPaneles()
        {
            int padding = pnlMainContainer.Padding.Left + pnlMainContainer.Padding.Right;
            int anchoDisponible = pnlMainContainer.ClientSize.Width - padding;

            pnlResumen.Width = anchoDisponible;
            pnlFormMovimiento.Width = anchoDisponible;
            pnlMovimientos.Width = anchoDisponible;

            pnlFormMovimiento.Location = new Point(
                pnlMainContainer.Padding.Left,
                pnlResumen.Bottom + 20
            );

            pnlMovimientos.Location = new Point(
                pnlMainContainer.Padding.Left,
                pnlFormMovimiento.Bottom + 20
            );

            dgvMovimientos.Height =
                pnlMovimientos.ClientSize.Height -
                pnlMovimientos.Padding.Top -
                pnlMovimientos.Padding.Bottom -
                75;

            int alturaTotalContenido = pnlMovimientos.Bottom + pnlMainContainer.Padding.Bottom;
            pnlMainContainer.AutoScrollMinSize = new Size(0, alturaTotalContenido);
        }

        private void InicializarDatos()
        {
            _dtMovimientos = DataManager.AlmacenHuevos;

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

            dgvMovimientos.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;

            if (dgvMovimientos.Columns.Contains("Fecha"))
            {
                dgvMovimientos.Columns["Fecha"].DefaultCellStyle.Format = "dd/MM/yyyy HH:mm";
            }
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
            {
                e.Handled = true;
            }
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

                DataManager.RegistrarIngresoHuevos(
                    galpon,
                    cantidad,
                    "Usuario Actual"
                );

                ActualizarResumen();

                MessageBox.Show(
                    "Ingreso registrado correctamente en almacén.",
                    "Éxito",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information
                );

                BtnCancelar_Click(sender, e);
            }
        }

        private void ActualizarResumen()
        {
            lblStock.Text = $"{DataManager.StockHuevos:N0} Huevos";
            lblDisponibles.Text = $"{DataManager.StockHuevos:N0} 🟢";
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
        private void CargarGalpones()
        {
            cboGalpon.Items.Clear();

            cboGalpon.Items.Add("Galpón 4");
            cboGalpon.Items.Add("Galpón 5");
            cboGalpon.Items.Add("Galpón 6");
            cboGalpon.Items.Add("Galpón 8");

            cboGalpon.SelectedIndex = -1;
        }
    }
}
