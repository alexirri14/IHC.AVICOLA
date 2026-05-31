using System;
using System.Data;
using System.Drawing;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public partial class ProduccionUserControl : UserControl
    {
        private DataTable _dtProduccion;

        public ProduccionUserControl()
        {
            InitializeComponent();
            InicializarDatos();
            ConfigurarEventos();
            this.Load += ProduccionUserControl_Load;
            this.Resize += ProduccionUserControl_Resize;
        }

        private void ProduccionUserControl_Load(object sender, EventArgs e)
        {
            AjustarPaneles();
            cboGalpon.SelectedIndex = 0;
        }

        private void ProduccionUserControl_Resize(object sender, EventArgs e)
        {
            AjustarPaneles();
        }

        private void AjustarPaneles()
        {
            // Ajustar el formulario de producción al ancho disponible
            int padding = pnlMainContainer.Padding.Left + pnlMainContainer.Padding.Right;
            int anchoDisponible = pnlMainContainer.ClientSize.Width - padding;
            pnlFormProduccion.Width = anchoDisponible;
            pnlProduccionDia.Width = anchoDisponible;

            // Ajustar posición del panel de producción del día
            pnlProduccionDia.Location = new System.Drawing.Point(pnlMainContainer.Padding.Left, pnlFormProduccion.Bottom + 20);

            // Ajustar la altura del scroll del contenedor principal
            int alturaTotalContenido = pnlProduccionDia.Bottom + pnlMainContainer.Padding.Bottom;
            pnlMainContainer.AutoScrollMinSize = new System.Drawing.Size(0, alturaTotalContenido);
        }

        private void InicializarDatos()
        {
            // Crear DataTable para la producción del día
            _dtProduccion = new DataTable();
            _dtProduccion.Columns.Add("Galpón", typeof(string));
            _dtProduccion.Columns.Add("Fecha", typeof(string));
            _dtProduccion.Columns.Add("Huevos", typeof(int));

            // Agregar datos de ejemplo
            string fechaEjemplo = DateTime.Now.ToString("dd/MM");
            _dtProduccion.Rows.Add("A", fechaEjemplo, 300);
            _dtProduccion.Rows.Add("B", fechaEjemplo, 250);
            _dtProduccion.Rows.Add("C", fechaEjemplo, 280);
            _dtProduccion.Rows.Add("D", fechaEjemplo, 320);

            // Asignar a DataGridView
            dgvProduccion.DataSource = _dtProduccion;
            ConfigurarDataGridView();
            ActualizarTotal();
        }

        private void ConfigurarDataGridView()
        {
            // Estilo del DataGridView
            dgvProduccion.EnableHeadersVisualStyles = false;
            dgvProduccion.ColumnHeadersDefaultCellStyle.BackColor = Color.FromArgb(243, 244, 246);
            dgvProduccion.ColumnHeadersDefaultCellStyle.ForeColor = Color.FromArgb(55, 65, 81);
            dgvProduccion.ColumnHeadersDefaultCellStyle.Font = new Font("Segoe UI", 11F, FontStyle.Bold);
            dgvProduccion.DefaultCellStyle.Font = new Font("Segoe UI", 10F);
            dgvProduccion.DefaultCellStyle.ForeColor = Color.FromArgb(31, 41, 55);
            dgvProduccion.DefaultCellStyle.SelectionBackColor = Color.FromArgb(209, 250, 229);
            dgvProduccion.DefaultCellStyle.SelectionForeColor = Color.FromArgb(6, 78, 59);
            dgvProduccion.AlternatingRowsDefaultCellStyle.BackColor = Color.White;
            dgvProduccion.BorderStyle = BorderStyle.None;
            dgvProduccion.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
            dgvProduccion.GridColor = Color.FromArgb(229, 231, 235);

            // Ajustar alto de filas
            dgvProduccion.RowTemplate.Height = 45;
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
            {
                e.Handled = true;
            }
        }

        private void BtnCancelar_Click(object sender, EventArgs e)
        {
            // Limpiar formulario
            cboGalpon.SelectedIndex = 0;
            txtCantidad.Clear();
            dtpFecha.Value = DateTime.Now;
            lblError.Visible = false;
        }

        private void BtnGuardar_Click(object sender, EventArgs e)
        {
            // Validar campos
            if (ValidarCampos())
            {
                string galponSeleccionado = cboGalpon.SelectedItem.ToString().Replace("Galpón ", "");
                string fechaFormateada = dtpFecha.Value.ToString("dd/MM");
                int cantidad = int.Parse(txtCantidad.Text);

                bool encontrado = false;
                foreach (DataRow row in _dtProduccion.Rows)
                {
                    if (row["Galpón"].ToString() == galponSeleccionado && row["Fecha"].ToString() == fechaFormateada)
                    {
                        row["Huevos"] = cantidad;
                        encontrado = true;
                        break;
                    }
                }

                if (!encontrado)
                {
                    _dtProduccion.Rows.Add(galponSeleccionado, fechaFormateada, cantidad);
                }

                ActualizarTotal();

                MessageBox.Show("Producción registrada correctamente!", "Éxito", MessageBoxButtons.OK, MessageBoxIcon.Information);

                BtnCancelar_Click(sender, e);
            }
        }

        private bool ValidarCampos()
        {
            bool esValido = true;
            string mensajeError = "";

            if (cboGalpon.SelectedIndex <= 0)
            {
                esValido = false;
                mensajeError += "⚠️ Seleccione un galpón.\n";
            }

            if (string.IsNullOrWhiteSpace(txtCantidad.Text))
            {
                esValido = false;
                mensajeError += "⚠️ Ingrese la cantidad de huevos.\n";
            }
            else if (int.Parse(txtCantidad.Text) <= 0)
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

        private void ActualizarTotal()
        {
            int total = 0;
            foreach (DataRow row in _dtProduccion.Rows)
            {
                total += Convert.ToInt32(row["Huevos"]);
            }
            lblTotal.Text = $"Total del día: {total} huevos";
        }
    }
}
