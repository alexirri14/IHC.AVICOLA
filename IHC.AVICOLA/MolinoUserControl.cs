
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public partial class MolinoUserControl : UserControl
    {
        private DataTable _dtHistorial;
        private Dictionary<string, Dictionary<string, double>> _formulas;

        public MolinoUserControl()
        {
            InitializeComponent();
            InicializarFormulas();
            InicializarDatos();
            ConfigurarEventos();
        }

        private void MolinoUserControl_Load(object sender, EventArgs e)
        {
            AjustarPaneles();
            CargarCombos();
        }

        private void MolinoUserControl_Resize(object sender, EventArgs e)
        {
            AjustarPaneles();
        }

        private void AjustarPaneles()
        {
            if (pnlMainContainer != null)
            {
                int padding = pnlMainContainer.Padding.Left + pnlMainContainer.Padding.Right;
                int anchoDisponible = pnlMainContainer.ClientSize.Width - padding;

                if (pnlTitulo != null)
                    pnlTitulo.Width = anchoDisponible;
                if (pnlForm != null)
                    pnlForm.Width = anchoDisponible;
                if (pnlFormDetalles != null)
                    pnlFormDetalles.Width = anchoDisponible;
                if (pnlHistorial != null)
                    pnlHistorial.Width = anchoDisponible;

                if (pnlForm != null && pnlTitulo != null)
                    pnlForm.Location = new Point(pnlMainContainer.Padding.Left, pnlTitulo.Bottom + 20);
                if (pnlFormDetalles != null && pnlForm != null)
                    pnlFormDetalles.Location = new Point(pnlMainContainer.Padding.Left, pnlForm.Bottom + 20);
                if (pnlHistorial != null && pnlFormDetalles != null)
                    pnlHistorial.Location = new Point(pnlMainContainer.Padding.Left, pnlFormDetalles.Bottom + 20);

                int alturaTotalContenido = 0;
                if (pnlHistorial != null)
                    alturaTotalContenido = pnlHistorial.Bottom + pnlMainContainer.Padding.Bottom;
                pnlMainContainer.AutoScrollMinSize = new Size(0, alturaTotalContenido);
            }
        }

        private void InicializarFormulas()
        {
            _formulas = new Dictionary<string, Dictionary<string, double>>
            {
                {
                    "GALPON 4 (POSTURA 1) - 839/154",
                    new Dictionary<string, double>
                    {
                        {"MAIZ", 839},
                        {"HARINA DE SOYA", 154},
                        {"PALMISTE", 98},
                        {"CAL FINA", 48},
                        {"CAL GRUESO", 103},
                        {"ACEITE DE SOYA", 45},
                        {"SAL INDUSTRIAL", 4.2},
                        {"PHOSBIC", 9.0},
                        {"PRE POSTURA", 1.5},
                        {"METIONINA", 3.6},
                        {"LISINA", 1.8},
                        {"BIO+COLINA", 0.45},
                        {"BICARBONATO", 4.0},
                        {"MICOFIX 300", 0.4},
                        {"SECUESTRANTE", 2.5},
                        {"TOXONINA", 0.6},
                        {"LIPIOSA", 1.0},
                        {"ADITRACE", 0.15}
                    }
                },
                {
                    "GALPON (6-8GT) (POSTURA 2) - 907/182",
                    new Dictionary<string, double>
                    {
                        {"MAIZ", 907},
                        {"HARINA DE SOYA", 182},
                        {"PALMISTE", 94},
                        {"CAL GRUESO", 30},
                        {"ACEITE DE SOYA", 126},
                        {"SAL INDUSTRIAL", 5},
                        {"PHOSBIC", 7.5},
                        {"PRE POSTURA", 1.5},
                        {"METIONINA", 3.8},
                        {"LISINA", 1.8},
                        {"BIO+COLINA", 0.15},
                        {"BICARBONATO", 4.5},
                        {"MICOFIX 300", 0.4},
                        {"SECUESTRANTE", 2.5},
                        {"TOXONINA", 0.5},
                        {"LIPIOSA", 0.15},
                        {"ADITRACE", 0.15}
                    }
                },
                {
                    "GALPON (3-5-8) (POSTURA 3) - 949/217",
                    new Dictionary<string, double>
                    {
                        {"MAIZ", 949},
                        {"HARINA DE SOYA", 217},
                        {"SOYA INTEGRAL", 370},
                        {"PHOSBIC", 91},
                        {"CAL GRUESO", 30},
                        {"ACEITE DE SOYA", 135},
                        {"SAL INDUSTRIAL", 5.2},
                        {"PRE POSTURA", 1.5},
                        {"METIONINA", 3.1},
                        {"LISINA", 2.1},
                        {"BIO+COLINA", 0.45},
                        {"BICARBONATO", 3.75},
                        {"MICOFIX 300", 0.4},
                        {"SECUESTRANTE", 2.5},
                        {"TOXONINA", 0.45},
                        {"LIPIOSA", 0.13},
                        {"ADITRACE", 0.15}
                    }
                }
            };
        }

        private void CargarCombos()
        {
            if (cboGalpon != null)
            {
                cboGalpon.Items.Clear();
                foreach (string formula in _formulas.Keys)
                {
                    cboGalpon.Items.Add(formula);
                }
            }
        }

        private void InicializarDatos()
        {
            _dtHistorial = new DataTable();
            _dtHistorial.Columns.Add("ID", typeof(int));
            _dtHistorial.Columns.Add("Fecha", typeof(DateTime));
            _dtHistorial.Columns.Add("Galpon/Formula", typeof(string));
            _dtHistorial.Columns.Add("Cantidad Producida (kg)", typeof(double));
            _dtHistorial.Columns.Add("Estado", typeof(string));

            _dtHistorial.Rows.Add(1, DateTime.Now.AddDays(-2), "GALPON 4 (POSTURA 1) - 839/154", 1000.0, "Completado");
            _dtHistorial.Rows.Add(2, DateTime.Now.AddDays(-1), "GALPON (6-8GT) (POSTURA 2) - 907/182", 800.0, "Completado");
            _dtHistorial.Rows.Add(3, DateTime.Now, "GALPON (3-5-8) (POSTURA 3) - 949/217", 1200.0, "Completado");

            if (dgvHistorial != null)
            {
                dgvHistorial.DataSource = _dtHistorial;
                ConfigurarDataGridView();
            }
        }

        private void ConfigurarDataGridView()
        {
            if (dgvHistorial != null)
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
        }

        private void ConfigurarEventos()
        {
            if (btnGuardar != null)
                btnGuardar.Click += BtnGuardar_Click;
            if (btnCancelar != null)
                btnCancelar.Click += BtnCancelar_Click;
            if (btnCargarFormula != null)
                btnCargarFormula.Click += BtnCargarFormula_Click;
            if (txtCantidadProduccion != null)
                txtCantidadProduccion.KeyPress += TxtCantidad_KeyPress;
            this.Load += MolinoUserControl_Load;
            this.Resize += MolinoUserControl_Resize;
        }

        private void TxtCantidad_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar) && e.KeyChar != '.')
                e.Handled = true;
        }

        private void BtnCargarFormula_Click(object sender, EventArgs e)
        {
            if (cboGalpon != null && cboGalpon.SelectedIndex != -1)
            {
                MostrarDetallesFormula(cboGalpon.SelectedItem.ToString());
            }
        }

        private void MostrarDetallesFormula(string nombreFormula)
        {
            if (flpIngredientes != null)
            {
                flpIngredientes.Controls.Clear();

                if (_formulas.TryGetValue(nombreFormula, out Dictionary<string, double> ingredientes))
                {
                    double total = 0;
                    foreach (var kvp in ingredientes)
                    {
                        total += kvp.Value;

                        Panel pnlIngrediente = new Panel();
                        pnlIngrediente.Size = new Size(280, 70);
                        pnlIngrediente.BackColor = Color.FromArgb(248, 249, 250);
                        pnlIngrediente.Padding = new Padding(10);

                        Label lblNombre = new Label();
                        lblNombre.Text = kvp.Key;
                        lblNombre.Font = new Font("Segoe UI", 9, FontStyle.Bold);
                        lblNombre.ForeColor = Color.FromArgb(33, 37, 41);
                        lblNombre.AutoSize = true;
                        lblNombre.Location = new Point(10, 10);

                        TextBox txtCantidad = new TextBox();
                        txtCantidad.Text = kvp.Value.ToString("0.000");
                        txtCantidad.Font = new Font("Segoe UI", 9);
                        txtCantidad.ReadOnly = true;
                        txtCantidad.BackColor = Color.White;
                        txtCantidad.Location = new Point(10, 35);
                        txtCantidad.Size = new Size(200, 25);

                        Label lblUnidad = new Label();
                        lblUnidad.Text = "kg";
                        lblUnidad.Font = new Font("Segoe UI", 9);
                        lblUnidad.ForeColor = Color.FromArgb(73, 80, 87);
                        lblUnidad.AutoSize = true;
                        lblUnidad.Location = new Point(215, 38);

                        pnlIngrediente.Controls.Add(lblNombre);
                        pnlIngrediente.Controls.Add(txtCantidad);
                        pnlIngrediente.Controls.Add(lblUnidad);

                        flpIngredientes.Controls.Add(pnlIngrediente);
                    }

                    if (lblTotalFormula != null)
                        lblTotalFormula.Text = "Total: " + total.ToString("0.000") + " kg";
                }
            }
        }

        private void BtnCancelar_Click(object sender, EventArgs e)
        {
            if (cboGalpon != null)
                cboGalpon.SelectedIndex = -1;
            if (txtCantidadProduccion != null)
                txtCantidadProduccion.Clear();
            if (lblError != null)
                lblError.Visible = false;
            if (flpIngredientes != null)
                flpIngredientes.Controls.Clear();
            if (lblTotalFormula != null)
                lblTotalFormula.Text = "";
        }

        private void BtnGuardar_Click(object sender, EventArgs e)
        {
            if (ValidarCampos())
            {
                double cantidad = double.Parse(txtCantidadProduccion.Text);
                string formula = cboGalpon.SelectedItem.ToString();

                int nuevoId = _dtHistorial.Rows.Count + 1;
                _dtHistorial.Rows.Add(nuevoId, DateTime.Now, formula, cantidad, "Completado");

                MessageBox.Show("Produccion registrada exitosamente!", "Exito", MessageBoxButtons.OK, MessageBoxIcon.Information);
                BtnCancelar_Click(sender, e);
            }
        }

        private bool ValidarCampos()
        {
            bool esValido = true;
            string mensajeError = "";

            if (cboGalpon == null || cboGalpon.SelectedIndex == -1)
            {
                esValido = false;
                mensajeError += "Seleccione un galpon/formula.";
            }

            if (txtCantidadProduccion == null || string.IsNullOrWhiteSpace(txtCantidadProduccion.Text))
            {
                esValido = false;
                mensajeError += "Ingrese una cantidad a producir.";
            }
            else if (double.Parse(txtCantidadProduccion.Text) <= 0)
            {
                esValido = false;
                mensajeError += "La cantidad debe ser mayor a 0.";
            }

            if (lblError != null)
            {
                lblError.Text = mensajeError;
                lblError.Visible = !esValido;
            }

            return esValido;
        }
    }
}
