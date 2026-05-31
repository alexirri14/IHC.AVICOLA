using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public partial class Form1 : Form
    {
        // Referencia a los UserControls
        private DashboardUserControl dashboardControl;
        private ProduccionUserControl produccionControl;
        private AlmacenHuevosUserControl almacenControl;
        private AlimentoUserControl alimentoControl;
        private MolinoUserControl molinoControl;
        private VentasUserControl ventasControl;
        private ReportesUserControl reportesControl;

        // Botón de navegación activo
        private Button activeNavButton;

        public Form1()
        {
            InitializeComponent();
            InitializeUserControls();
            InitializeNavigation();
            ApplyThemeToAll();
            ShowDashboard();
        }

        private void InitializeUserControls()
        {
            // Inicializar todos los UserControls
            dashboardControl = new DashboardUserControl { Dock = DockStyle.Fill };
            produccionControl = new ProduccionUserControl { Dock = DockStyle.Fill };
            almacenControl = new AlmacenHuevosUserControl { Dock = DockStyle.Fill };
            alimentoControl = new AlimentoUserControl { Dock = DockStyle.Fill };
            molinoControl = new MolinoUserControl { Dock = DockStyle.Fill };
            ventasControl = new VentasUserControl { Dock = DockStyle.Fill };
            reportesControl = new ReportesUserControl { Dock = DockStyle.Fill };
        }

        private void InitializeNavigation()
        {
            // Asignar eventos a los botones de navegación
            btnDashboard.Click += (s, e) => ShowDashboard();
            btnProduccion.Click += (s, e) => ShowProduccion();
            btnAlmacen.Click += (s, e) => ShowAlmacen();
            btnAlimento.Click += (s, e) => ShowAlimento();
            btnMolino.Click += (s, e) => ShowMolino();
            btnVentas.Click += (s, e) => ShowVentas();
            btnReportes.Click += (s, e) => ShowReportes();

            // Evento de tema
            btnTheme.Click += BtnTheme_Click;

            // Suscribirse al evento de cambio de tema
            ThemeManager.ThemeChanged += ThemeManager_ThemeChanged;
        }

        private void BtnTheme_Click(object sender, EventArgs e)
        {
            ThemeManager.ToggleTheme();
            ApplyThemeToAll();
        }

        private void ThemeManager_ThemeChanged(object sender, EventArgs e)
        {
            ApplyThemeToAll();
        }

        private void ApplyThemeToAll()
        {
            // Aplicar tema al formulario principal
            ThemeManager.ApplyTheme(this, activeNavButton);

            // Aplicar tema a los UserControls
            ApplyThemeToUserControl(dashboardControl);
            ApplyThemeToUserControl(produccionControl);
            ApplyThemeToUserControl(almacenControl);
            ApplyThemeToUserControl(alimentoControl);
            ApplyThemeToUserControl(molinoControl);
            ApplyThemeToUserControl(ventasControl);
            ApplyThemeToUserControl(reportesControl);
        }

        private void ApplyThemeToUserControl(Control control)
        {
            // Aplicar tema recursivamente a todos los controles
            bool isDark = ThemeManager.IsDarkMode;

            foreach (Control child in control.Controls)
            {
                ApplyThemeToUserControl(child); // Recursividad

                if (child is Panel panel)
                {
                    // Manejar colores de paneles
                    if (panel.BackColor == Color.White)
                        panel.BackColor = isDark ? Color.FromArgb(30, 30, 30) : Color.White;
                    else if (panel.BackColor == Color.FromArgb(248, 249, 250))
                        panel.BackColor = isDark ? Color.FromArgb(20, 20, 20) : Color.FromArgb(248, 249, 250);
                }
                else if (child is Label label)
                {
                    // Manejar colores de etiquetas
                    if (label.ForeColor == Color.FromArgb(30, 41, 59))
                        label.ForeColor = isDark ? Color.White : Color.FromArgb(30, 41, 59);
                    else if (label.ForeColor == Color.FromArgb(100, 116, 139))
                        label.ForeColor = isDark ? Color.LightGray : Color.FromArgb(100, 116, 139);
                }
                else if (child is Button button)
                {
                    // Botones normales
                    if (button.FlatStyle == FlatStyle.Flat && button.BackColor == Color.FromArgb(107, 114, 128))
                    {
                        button.BackColor = isDark ? Color.FromArgb(60, 60, 60) : Color.FromArgb(107, 114, 128);
                    }
                }
            }
        }

        private void SetActiveNavButton(Button button)
        {
            // Resetear el botón anterior
            if (activeNavButton != null)
            {
                activeNavButton.BackColor = Color.Transparent;
                activeNavButton.ForeColor = Color.White;
            }

            // Establecer el nuevo botón activo
            activeNavButton = button;
            activeNavButton.BackColor = Color.White;
            activeNavButton.ForeColor = Color.Teal;
        }

        private void ShowUserControl(Control userControl, Button navButton)
        {
            // Limpiar el panel de contenido
            pnlContent.Controls.Clear();

            // Añadir el UserControl
            pnlContent.Controls.Add(userControl);

            // Establecer botón activo
            SetActiveNavButton(navButton);
        }

        private void ShowDashboard() => ShowUserControl(dashboardControl, btnDashboard);
        private void ShowProduccion() => ShowUserControl(produccionControl, btnProduccion);
        private void ShowAlmacen() => ShowUserControl(almacenControl, btnAlmacen);
        private void ShowAlimento() => ShowUserControl(alimentoControl, btnAlimento);
        private void ShowMolino() => ShowUserControl(molinoControl, btnMolino);
        private void ShowVentas() => ShowUserControl(ventasControl, btnVentas);
        private void ShowReportes() => ShowUserControl(reportesControl, btnReportes);
    }
}
