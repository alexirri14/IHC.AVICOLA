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
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            btnProduccion.Click += BtnProduccion_Click;
            Console.WriteLine("Hola mundo");
        }

        private void BtnProduccion_Click(object sender, EventArgs e)
        {
            ProduccionForm produccionForm = new ProduccionForm();
            produccionForm.Show();
            this.Hide();
        }

        private void pnlMain_Paint(object sender, PaintEventArgs e)
        {

        }
    }
}
