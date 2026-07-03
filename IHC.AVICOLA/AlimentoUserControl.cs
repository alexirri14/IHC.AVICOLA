
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public class Insumo
    {
        public string Nombre;
        public string Categoria;
        public int StockSacos;
        public int StockKgLitros;
    }

    public class Movimiento
    {
        public string Fecha;
        public string Insumo;
        public string Tipo;
        public int Cantidad;
        public string Unidad;
    }

    public partial class AlimentoUserControl : UserControl
    {
        private List<Insumo> _insumos;
        private List<Movimiento> _movimientos;
        private DataTable _dtMovimientos;

        public AlimentoUserControl()
        {
            InitializeComponent();
            InicializarDatos();
            ConfigurarEventos();
            this.Resize += AlimentoUserControl_Resize;
            this.Load += AlimentoUserControl_Load;
        }

        private void AlimentoUserControl_Load(object sender, EventArgs e)
        {
            AjustarPaneles();
        }

        private void AlimentoUserControl_Resize(object sender, EventArgs e)
        {
            AjustarPaneles();
        }

        private void AjustarPaneles()
        {
            // Ajustar el panel de insumos al ancho del contenedor principal
            int padding = pnlMainContainer.Padding.Left + pnlMainContainer.Padding.Right;
            int anchoDisponible = pnlMainContainer.ClientSize.Width - padding;
            pnlInsumos.Width = anchoDisponible;

            // Calcular el ancho para cada columna de insumos (3 columnas)
            int espacioEntrePaneles = 30;
            int anchoPanel = (pnlInsumos.ClientSize.Width - pnlInsumos.Padding.Left - pnlInsumos.Padding.Right - 2 * espacioEntrePaneles) / 3;
            
            // Asegurar un ancho mínimo para cada panel (reducido para que quepan los 3)
            if (anchoPanel < 300) anchoPanel = 300;

            // Ajustar los paneles de categorías
            pnlSacos50kg.Width = anchoPanel;
            pnlSacos25kg.Width = anchoPanel;
            pnlAceite.Width = anchoPanel;

            // Posicionar los paneles de categorías
            pnlSacos50kg.Location = new System.Drawing.Point(pnlInsumos.Padding.Left, pnlInsumos.Padding.Top);
            pnlSacos25kg.Location = new System.Drawing.Point(pnlSacos50kg.Right + espacioEntrePaneles, pnlInsumos.Padding.Top);
            pnlAceite.Location = new System.Drawing.Point(pnlSacos25kg.Right + espacioEntrePaneles, pnlInsumos.Padding.Top);

            // Ajustar el alto del panel de insumos
            int altoMaximoPanel = Math.Max(pnlSacos50kg.Height, Math.Max(pnlSacos25kg.Height, pnlAceite.Height));
            pnlInsumos.Height = altoMaximoPanel + pnlInsumos.Padding.Top + pnlInsumos.Padding.Bottom + 20;

            // Posicionar el panel de botones
            pnlBotones.Location = new System.Drawing.Point(pnlMainContainer.Padding.Left, pnlInsumos.Bottom + 20);
            pnlBotones.Width = anchoDisponible;

            // Posicionar el panel de movimientos
            pnlMovimientos.Location = new System.Drawing.Point(pnlMainContainer.Padding.Left, pnlBotones.Bottom + 20);
            pnlMovimientos.Width = anchoDisponible;
            pnlMovimientos.Height = 300;

            // Ajustar la altura del scroll del contenedor principal
            int alturaTotalContenido = pnlMovimientos.Bottom + pnlMainContainer.Padding.Bottom;
            pnlMainContainer.AutoScrollMinSize = new System.Drawing.Size(0, alturaTotalContenido);

            // Volver a cargar los insumos para ajustar los paneles internos
            CargarInsumos();
        }

        private void InicializarDatos()
        {
            _insumos = new List<Insumo>();
            _insumos.Add(new Insumo { Nombre = "MAIZ", Categoria = "saco50kg", StockSacos = 100, StockKgLitros = 5000 });
            _insumos.Add(new Insumo { Nombre = "HARINA DE SOYA", Categoria = "saco50kg", StockSacos = 50, StockKgLitros = 2500 });
            _insumos.Add(new Insumo { Nombre = "SOYA INTEGRAL", Categoria = "saco50kg", StockSacos = 30, StockKgLitros = 1500 });
            _insumos.Add(new Insumo { Nombre = "PALMISTE", Categoria = "saco50kg", StockSacos = 15, StockKgLitros = 750 });
            _insumos.Add(new Insumo { Nombre = "SAL INDUSTRIAL", Categoria = "saco50kg", StockSacos = 10, StockKgLitros = 500 });
            _insumos.Add(new Insumo { Nombre = "PHOSBIC", Categoria = "saco25kg", StockSacos = 30, StockKgLitros = 750 });
            _insumos.Add(new Insumo { Nombre = "CAL FINA", Categoria = "saco25kg", StockSacos = 20, StockKgLitros = 500 });
            _insumos.Add(new Insumo { Nombre = "CAL GRUESO", Categoria = "saco25kg", StockSacos = 25, StockKgLitros = 625 });
            _insumos.Add(new Insumo { Nombre = "BICARBONATO", Categoria = "saco25kg", StockSacos = 10, StockKgLitros = 250 });
            _insumos.Add(new Insumo { Nombre = "PRE POSTURA", Categoria = "saco25kg", StockSacos = 8, StockKgLitros = 200 });
            _insumos.Add(new Insumo { Nombre = "PRE LEVANTE", Categoria = "saco25kg", StockSacos = 5, StockKgLitros = 125 });
            _insumos.Add(new Insumo { Nombre = "METIONINA", Categoria = "saco25kg", StockSacos = 6, StockKgLitros = 150 });
            _insumos.Add(new Insumo { Nombre = "LISINA", Categoria = "saco25kg", StockSacos = 6, StockKgLitros = 150 });
            _insumos.Add(new Insumo { Nombre = "BIO+COLINA", Categoria = "saco25kg", StockSacos = 4, StockKgLitros = 100 });
            _insumos.Add(new Insumo { Nombre = "MICOFIX 300", Categoria = "saco25kg", StockSacos = 5, StockKgLitros = 125 });
            _insumos.Add(new Insumo { Nombre = "SECUESTRANTE", Categoria = "saco25kg", StockSacos = 10, StockKgLitros = 250 });
            _insumos.Add(new Insumo { Nombre = "TOXONINA", Categoria = "saco25kg", StockSacos = 8, StockKgLitros = 200 });
            _insumos.Add(new Insumo { Nombre = "LIPIOSA", Categoria = "saco25kg", StockSacos = 5, StockKgLitros = 125 });
            _insumos.Add(new Insumo { Nombre = "ADITRACE", Categoria = "saco25kg", StockSacos = 3, StockKgLitros = 75 });
            _insumos.Add(new Insumo { Nombre = "ACEITE DE SOYA", Categoria = "litros", StockSacos = 3, StockKgLitros = 3000 });

            _movimientos = new List<Movimiento>();
            _movimientos.Add(new Movimiento { Fecha = "08/05/2026", Insumo = "MAIZ", Tipo = "Ingreso", Cantidad = 10, Unidad = "sacos (50kg)" });
            _movimientos.Add(new Movimiento { Fecha = "08/05/2026", Insumo = "HARINA DE SOYA", Tipo = "Ingreso", Cantidad = 5, Unidad = "sacos (50kg)" });

            _dtMovimientos = new DataTable();
            _dtMovimientos.Columns.Add("Fecha");
            _dtMovimientos.Columns.Add("Insumo");
            _dtMovimientos.Columns.Add("Tipo");
            _dtMovimientos.Columns.Add("Cantidad");

            ActualizarDataTableMovimientos();

            dgvMovimientos.DataSource = _dtMovimientos;
            ConfigurarDataGridView();
        }

        private void ActualizarDataTableMovimientos()
        {
            _dtMovimientos.Rows.Clear();
            foreach (var mov in _movimientos)
            {
                string signo = mov.Tipo == "Ingreso" ? "+" : "-";
                _dtMovimientos.Rows.Add(mov.Fecha, mov.Insumo, mov.Tipo, signo + mov.Cantidad.ToString() + " " + mov.Unidad);
            }
        }

        private void ConfigurarDataGridView()
        {
            dgvMovimientos.EnableHeadersVisualStyles = false;
            dgvMovimientos.ColumnHeadersDefaultCellStyle.BackColor = Color.FromArgb(249, 115, 22);
            dgvMovimientos.ColumnHeadersDefaultCellStyle.ForeColor = Color.White;
            dgvMovimientos.ColumnHeadersDefaultCellStyle.Font = new Font("Segoe UI", 10, FontStyle.Bold);
            dgvMovimientos.DefaultCellStyle.SelectionBackColor = Color.FromArgb(249, 115, 22);
            dgvMovimientos.DefaultCellStyle.SelectionForeColor = Color.White;
            dgvMovimientos.AlternatingRowsDefaultCellStyle.BackColor = Color.FromArgb(245, 245, 245);
            dgvMovimientos.BorderStyle = BorderStyle.None;
            dgvMovimientos.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
        }

        private void ConfigurarEventos()
        {
            btnIngreso.Click += BtnIngreso_Click;
            btnConsumo.Click += BtnConsumo_Click;
        }

        private void CargarInsumos()
        {
            LimpiarPaneles();

            int y50kg = 75;
            foreach (var insumo in _insumos)
            {
                if (insumo.Categoria == "saco50kg")
                {
                    Panel pnl = CrearPanelInsumo(insumo, Color.FromArgb(219, 234, 254), Color.FromArgb(37, 99, 235), pnlSacos50kg);
                    pnl.Location = new Point(25, y50kg);
                    pnlSacos50kg.Controls.Add(pnl);
                    y50kg += 85;
                }
            }
            pnlSacos50kg.Height = y50kg + 25;

            int y25kg = 75;
            foreach (var insumo in _insumos)
            {
                if (insumo.Categoria == "saco25kg")
                {
                    Panel pnl = CrearPanelInsumo(insumo, Color.FromArgb(243, 232, 255), Color.FromArgb(147, 51, 234), pnlSacos25kg);
                    pnl.Location = new Point(25, y25kg);
                    pnlSacos25kg.Controls.Add(pnl);
                    y25kg += 85;
                }
            }
            pnlSacos25kg.Height = y25kg + 25;

            int yAceite = 75;
            foreach (var insumo in _insumos)
            {
                if (insumo.Categoria == "litros")
                {
                    Panel pnl = CrearPanelInsumo(insumo, Color.FromArgb(254, 243, 199), Color.FromArgb(217, 119, 6), pnlAceite);
                    pnl.Location = new Point(25, yAceite);
                    pnlAceite.Controls.Add(pnl);
                    yAceite += 130;
                }
            }
            pnlAceite.Height = yAceite + 25;
        }

        private Panel CrearPanelInsumo(Insumo insumo, Color bgColor, Color borderColor, Panel parentPanel)
        {
            Panel pnl = new Panel();
            pnl.BackColor = bgColor;
            int panelWidth = parentPanel.Width - 50;
            pnl.Size = new Size(panelWidth, insumo.Categoria == "litros" ? 120 : 70);
            pnl.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;

            Label lblNombre = new Label();
            lblNombre.Text = insumo.Nombre;
            lblNombre.Font = new Font("Segoe UI", 10, FontStyle.Bold);
            lblNombre.ForeColor = Color.FromArgb(31, 41, 55);
            lblNombre.Location = new Point(15, 10);
            lblNombre.AutoSize = true;
            pnl.Controls.Add(lblNombre);

            Label lblSacoTexto = new Label();
            lblSacoTexto.Text = GetSacoTexto(insumo);
            lblSacoTexto.Font = new Font("Segoe UI", 9);
            lblSacoTexto.ForeColor = Color.FromArgb(75, 85, 99);
            lblSacoTexto.Location = new Point(15, 35);
            lblSacoTexto.AutoSize = true;
            pnl.Controls.Add(lblSacoTexto);

            // Panel para la información del lado derecho
            Panel pnlRight = new Panel();
            pnlRight.Size = new Size(150, pnl.Height);
            pnlRight.Location = new Point(panelWidth - 150, 0);
            pnlRight.Anchor = AnchorStyles.Top | AnchorStyles.Right;
            pnl.Controls.Add(pnlRight);

            Label lblStockSacos = new Label();
            lblStockSacos.Text = insumo.StockSacos.ToString();
            lblStockSacos.Font = new Font("Segoe UI", 16, FontStyle.Bold);
            lblStockSacos.ForeColor = borderColor;
            lblStockSacos.AutoSize = true;
            lblStockSacos.TextAlign = ContentAlignment.TopRight;
            // Posicionar en el panel derecho
            lblStockSacos.Location = new Point(pnlRight.Width - lblStockSacos.PreferredWidth - 15, 10);
            pnlRight.Controls.Add(lblStockSacos);

            Label lblStockKg = new Label();
            string unidad = insumo.Categoria == "litros" ? "litros" : "kg";
            lblStockKg.Text = insumo.StockKgLitros.ToString() + " " + unidad;
            lblStockKg.Font = new Font("Segoe UI", 9);
            lblStockKg.ForeColor = Color.FromArgb(75, 85, 99);
            lblStockKg.AutoSize = true;
            lblStockKg.TextAlign = ContentAlignment.TopRight;
            lblStockKg.Location = new Point(pnlRight.Width - lblStockKg.PreferredWidth - 15, 40);
            pnlRight.Controls.Add(lblStockKg);

            Panel borderPanel = new Panel();
            borderPanel.BackColor = borderColor;
            borderPanel.Size = new Size(4, pnl.Height);
            borderPanel.Location = new Point(0, 0);
            borderPanel.Dock = DockStyle.Left;
            pnl.Controls.Add(borderPanel);
            borderPanel.BringToFront();

            int limiteStock = insumo.Categoria == "saco50kg" ? 500 : insumo.Categoria == "saco25kg" ? 100 : 500;
            if (insumo.StockKgLitros < limiteStock)
            {
                Label lblAlerta = new Label();
                lblAlerta.Text = "Stock bajo";
                lblAlerta.Font = new Font("Segoe UI", 8, FontStyle.Bold);
                lblAlerta.ForeColor = Color.FromArgb(180, 83, 9);
                lblAlerta.Location = new Point(15, 52);
                lblAlerta.AutoSize = true;
                lblAlerta.Anchor = AnchorStyles.Top | AnchorStyles.Left;
                pnl.Controls.Add(lblAlerta);
            }

            return pnl;
        }

        private string GetSacoTexto(Insumo insumo)
        {
            if (insumo.Categoria == "litros")
            {
                return "bidones de 1000L";
            }
            else if (insumo.Categoria == "saco50kg")
            {
                return "sacos de 50kg";
            }
            else
            {
                return "sacos de 25kg";
            }
        }

        private void LimpiarPaneles()
        {
            for (int i = pnlSacos50kg.Controls.Count - 1; i >= 0; i--)
            {
                if (pnlSacos50kg.Controls[i] != lblSacos50kgTitle)
                {
                    pnlSacos50kg.Controls.RemoveAt(i);
                }
            }
            for (int i = pnlSacos25kg.Controls.Count - 1; i >= 0; i--)
            {
                if (pnlSacos25kg.Controls[i] != lblSacos25kgTitle)
                {
                    pnlSacos25kg.Controls.RemoveAt(i);
                }
            }
            for (int i = pnlAceite.Controls.Count - 1; i >= 0; i--)
            {
                if (pnlAceite.Controls[i] != lblAceiteTitle)
                {
                    pnlAceite.Controls.RemoveAt(i);
                }
            }
        }

        private void BtnIngreso_Click(object sender, EventArgs e)
        {
            AbrirModal("Ingreso");
        }

        private void BtnConsumo_Click(object sender, EventArgs e)
        {
            AbrirModal("Consumo");
        }

        private void AbrirModal(string tipoMovimiento)
        {
            FormMovimientoAlimento form = new FormMovimientoAlimento(_insumos, tipoMovimiento);
            if (form.ShowDialog() == DialogResult.OK)
            {
                Insumo insumo = _insumos.Find(i => i.Nombre == form.InsumoSeleccionado);
                if (insumo != null)
                {
                    int cantSacos = form.Cantidad;
                    int multiplicador = insumo.Categoria == "saco50kg" ? 50 : insumo.Categoria == "saco25kg" ? 25 : 1000;
                    int cantKg = cantSacos * multiplicador;

                    int cambio = tipoMovimiento == "Ingreso" ? cantSacos : -cantSacos;
                    int cambioKg = tipoMovimiento == "Ingreso" ? cantKg : -cantKg;

                    insumo.StockSacos += cambio;
                    insumo.StockKgLitros += cambioKg;

                    string unidadTexto = insumo.Categoria == "litros" ? "bidones (" + cantKg.ToString() + "L)" : "sacos (" + cantKg.ToString() + "kg)";

                    Movimiento nuevoMov = new Movimiento();
                    nuevoMov.Fecha = DateTime.Now.ToString("dd/MM/yyyy");
                    nuevoMov.Insumo = insumo.Nombre;
                    nuevoMov.Tipo = tipoMovimiento;
                    nuevoMov.Cantidad = cantSacos;
                    nuevoMov.Unidad = unidadTexto;
                    _movimientos.Insert(0, nuevoMov);

                    CargarInsumos();
                    ActualizarDataTableMovimientos();
                }
            }
        }
    }

    public class FormMovimientoAlimento : Form
    {
        private List<Insumo> _insumos;
        private string _tipoMovimiento;
        public string InsumoSeleccionado;
        public int Cantidad;

        private ComboBox cboInsumos;
        private TextBox txtCantidad;
        private Label lblCantidadUnidad;

        public FormMovimientoAlimento(List<Insumo> insumos, string tipoMovimiento)
        {
            _insumos = insumos;
            _tipoMovimiento = tipoMovimiento;
            InitializeCustomComponent();
        }

        private void InitializeCustomComponent()
        {
            this.Text = "Registrar " + _tipoMovimiento;
            this.Size = new Size(450, 300);
            this.StartPosition = FormStartPosition.CenterParent;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;

            Label lblInsumo = new Label();
            lblInsumo.Text = "Insumo";
            lblInsumo.Location = new Point(20, 20);
            lblInsumo.Width = 400;
            this.Controls.Add(lblInsumo);

            cboInsumos = new ComboBox();
            cboInsumos.Location = new Point(20, 45);
            cboInsumos.Width = 400;
            cboInsumos.DropDownStyle = ComboBoxStyle.DropDownList;
            cboInsumos.Items.Add("Seleccionar insumo");
            foreach (var insumo in _insumos)
            {
                cboInsumos.Items.Add(insumo.Nombre);
            }
            cboInsumos.SelectedIndex = 0;
            cboInsumos.SelectedIndexChanged += CboInsumos_SelectedIndexChanged;
            this.Controls.Add(cboInsumos);

            Label lblCantidad = new Label();
            lblCantidad.Text = "Cantidad";
            lblCantidad.Location = new Point(20, 85);
            lblCantidad.Width = 400;
            this.Controls.Add(lblCantidad);

            txtCantidad = new TextBox();
            txtCantidad.Location = new Point(20, 110);
            txtCantidad.Width = 400;
            txtCantidad.KeyPress += TxtCantidad_KeyPress;
            txtCantidad.TextChanged += TxtCantidad_TextChanged;
            this.Controls.Add(txtCantidad);

            lblCantidadUnidad = new Label();
            lblCantidadUnidad.Location = new Point(20, 140);
            lblCantidadUnidad.Width = 400;
            lblCantidadUnidad.ForeColor = Color.FromArgb(75, 85, 99);
            this.Controls.Add(lblCantidadUnidad);

            Button btnRegistrar = new Button();
            btnRegistrar.Text = "Registrar";
            btnRegistrar.Location = new Point(20, 200);
            btnRegistrar.Width = 180;
            btnRegistrar.Height = 35;
            btnRegistrar.BackColor = Color.FromArgb(249, 115, 22);
            btnRegistrar.ForeColor = Color.White;
            btnRegistrar.FlatStyle = FlatStyle.Flat;
            btnRegistrar.Font = new Font("Segoe UI", 10, FontStyle.Bold);
            btnRegistrar.Click += BtnRegistrar_Click;
            this.Controls.Add(btnRegistrar);

            Button btnCancelar = new Button();
            btnCancelar.Text = "Cancelar";
            btnCancelar.Location = new Point(220, 200);
            btnCancelar.Width = 180;
            btnCancelar.Height = 35;
            btnCancelar.BackColor = Color.FromArgb(107, 114, 128);
            btnCancelar.ForeColor = Color.White;
            btnCancelar.FlatStyle = FlatStyle.Flat;
            btnCancelar.Font = new Font("Segoe UI", 10, FontStyle.Bold);
            btnCancelar.Click += BtnCancelar_Click;
            this.Controls.Add(btnCancelar);
        }

        private void TxtCantidad_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar))
            {
                e.Handled = true;
            }
        }

        private void TxtCantidad_TextChanged(object sender, EventArgs e)
        {
            ActualizarUnidad();
        }

        private void CboInsumos_SelectedIndexChanged(object sender, EventArgs e)
        {
            ActualizarUnidad();
        }

        private void ActualizarUnidad()
        {
            if (cboInsumos.SelectedIndex > 0 && !string.IsNullOrWhiteSpace(txtCantidad.Text))
            {
                Insumo insumo = _insumos.Find(i => i.Nombre == cboInsumos.SelectedItem.ToString());
                if (insumo != null)
                {
                    int multiplicador = insumo.Categoria == "saco50kg" ? 50 : insumo.Categoria == "saco25kg" ? 25 : 1000;
                    string unidad = insumo.Categoria == "litros" ? "litros" : "kg";
                    string unidadSacos = insumo.Categoria == "litros" ? "bidones de 1000L" : "sacos";
                    lblCantidadUnidad.Text = "Cantidad en " + unidadSacos + " = " + (int.Parse(txtCantidad.Text) * multiplicador).ToString() + " " + unidad;
                }
            }
            else
            {
                lblCantidadUnidad.Text = "";
            }
        }

        private void BtnRegistrar_Click(object sender, EventArgs e)
        {
            if (cboInsumos.SelectedIndex > 0 && !string.IsNullOrWhiteSpace(txtCantidad.Text))
            {
                InsumoSeleccionado = cboInsumos.SelectedItem.ToString();
                Cantidad = int.Parse(txtCantidad.Text);
                this.DialogResult = DialogResult.OK;
                this.Close();
            }
            else
            {
                MessageBox.Show("Complete todos los campos", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void BtnCancelar_Click(object sender, EventArgs e)
        {
            this.DialogResult = DialogResult.Cancel;
            this.Close();
        }
    }
}
