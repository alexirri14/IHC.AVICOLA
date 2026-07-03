using System;
using System.Drawing;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public static class ThemeManager
    {
        public static bool IsDarkMode { get; private set; } = false;

        public static event EventHandler ThemeChanged;

        public static void ToggleTheme()
        {
            IsDarkMode = !IsDarkMode;
            ThemeChanged?.Invoke(null, EventArgs.Empty);
        }

        public static void ApplyTheme(Form form, Button activeNavButton = null)
        {
            bool isDark = IsDarkMode;
            foreach (Control control in form.Controls)
            {
                ApplyThemeToControl(control, isDark, activeNavButton);
            }
        }

        private static void ApplyThemeToControl(Control control, bool isDark, Button activeNavButton)
        {
            foreach (Control child in control.Controls)
            {
                ApplyThemeToControl(child, isDark, activeNavButton);
            }

            if (control is Panel panel)
            {
                if (panel.BackColor == Color.Teal)
                {
                    panel.BackColor = isDark ? Color.FromArgb(0, 80, 80) : Color.Teal;
                }
                else if (panel.BackColor == Color.FromArgb(0, 150, 150))
                {
                    panel.BackColor = isDark ? Color.FromArgb(0, 100, 100) : Color.FromArgb(0, 150, 150);
                }
                else if (panel.BackColor == Color.White)
                {
                    panel.BackColor = isDark ? Color.FromArgb(30, 30, 30) : Color.White;
                }
                else if (panel.BackColor == Color.FromArgb(248, 249, 250))
                {
                    panel.BackColor = isDark ? Color.FromArgb(20, 20, 20) : Color.FromArgb(248, 249, 250);
                }
            }
            else if (control is Label label)
            {
                if (label.ForeColor == Color.FromArgb(30, 41, 59))
                {
                    label.ForeColor = isDark ? Color.White : Color.FromArgb(30, 41, 59);
                }
                else if (label.ForeColor == Color.FromArgb(100, 116, 139))
                {
                    label.ForeColor = isDark ? Color.LightGray : Color.FromArgb(100, 116, 139);
                }
                else if (label.ForeColor == Color.FromArgb(146, 64, 14))
                {
                    label.ForeColor = isDark ? Color.FromArgb(255, 200, 100) : Color.FromArgb(146, 64, 14);
                }
                else if (label.ForeColor == Color.Teal)
                {
                    label.ForeColor = isDark ? Color.FromArgb(0, 200, 200) : Color.Teal;
                }
            }
            else if (control is Button button)
            {
                if (button == activeNavButton)
                {
                    button.BackColor = isDark ? Color.FromArgb(40, 40, 40) : Color.White;
                    button.ForeColor = isDark ? Color.FromArgb(0, 200, 200) : Color.Teal;
                }
                else if (button.FlatStyle == FlatStyle.Flat && button.Text.StartsWith("🌙") || button.Text.StartsWith("☀️"))
                {
                    button.BackColor = isDark ? Color.FromArgb(40, 40, 40) : Color.White;
                    button.ForeColor = isDark ? Color.FromArgb(0, 200, 200) : Color.Teal;
                    button.Text = isDark ? "☀️ Tema Claro" : "🌙 Tema Oscuro";
                }
                else if (button.FlatStyle == FlatStyle.Flat && button.Text.StartsWith("💾"))
                {
                    button.BackColor = isDark ? Color.FromArgb(0, 80, 80) : Color.Teal;
                    button.ForeColor = Color.White;
                }
                else if (button.FlatStyle == FlatStyle.Flat && button.BackColor == Color.FromArgb(107, 114, 128))
                {
                    button.BackColor = isDark ? Color.FromArgb(60, 60, 60) : Color.FromArgb(107, 114, 128);
                    button.ForeColor = Color.White;
                }
                else if (button.FlatStyle == FlatStyle.Flat)
                {
                    button.BackColor = Color.Transparent;
                    button.ForeColor = Color.White;
                }
            }
            else if (control is TextBox textBox)
            {
                textBox.BackColor = isDark ? Color.FromArgb(40, 40, 40) : Color.White;
                textBox.ForeColor = isDark ? Color.White : Color.FromArgb(30, 41, 59);
            }
            else if (control is ComboBox comboBox)
            {
                comboBox.BackColor = isDark ? Color.FromArgb(40, 40, 40) : Color.White;
                comboBox.ForeColor = isDark ? Color.White : Color.FromArgb(30, 41, 59);
            }
            else if (control is DateTimePicker dateTimePicker)
            {
                dateTimePicker.CalendarForeColor = isDark ? Color.White : Color.FromArgb(30, 41, 59);
                dateTimePicker.CalendarMonthBackground = isDark ? Color.FromArgb(40, 40, 40) : Color.White;
                dateTimePicker.CalendarTitleForeColor = isDark ? Color.White : Color.FromArgb(30, 41, 59);
                dateTimePicker.CalendarTitleBackColor = isDark ? Color.FromArgb(0, 80, 80) : Color.Teal;
            }
            else if (control is DataGridView dataGridView)
            {
                dataGridView.BackgroundColor = isDark ? Color.FromArgb(30, 30, 30) : Color.White;
                dataGridView.DefaultCellStyle.BackColor = isDark ? Color.FromArgb(40, 40, 40) : Color.White;
                dataGridView.DefaultCellStyle.ForeColor = isDark ? Color.White : Color.FromArgb(30, 41, 59);
                dataGridView.ColumnHeadersDefaultCellStyle.BackColor = isDark ? Color.FromArgb(0, 80, 80) : Color.Teal;
                dataGridView.ColumnHeadersDefaultCellStyle.ForeColor = Color.White;
                dataGridView.GridColor = isDark ? Color.FromArgb(60, 60, 60) : Color.LightGray;
            }
        }
    }
}
