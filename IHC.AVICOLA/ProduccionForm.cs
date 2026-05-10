using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace IHC.AVICOLA
{
    public partial class ProduccionForm : Form
    {
        public ProduccionForm()
        {
            InitializeComponent();
            btnDashboard.Click += BtnDashboard_Click;
        }

        private void BtnDashboard_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnDashboard_Click_1(object sender, EventArgs e)
        {
            Form1 form1 = new Form1();
            form1.Show();
            this.Hide();
        }
    }
}
