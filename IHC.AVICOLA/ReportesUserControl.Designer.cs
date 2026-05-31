namespace IHC.AVICOLA
{
    partial class ReportesUserControl
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        private void InitializeComponent()
        {
            this.pnlTitulo = new System.Windows.Forms.Panel();
            this.lblTitulo = new System.Windows.Forms.Label();
            this.pnlReportes = new System.Windows.Forms.Panel();
            this.lblProduccion = new System.Windows.Forms.Label();
            this.lblVentas = new System.Windows.Forms.Label();
            this.lblStock = new System.Windows.Forms.Label();
            this.lblProduccionValor = new System.Windows.Forms.Label();
            this.lblVentasValor = new System.Windows.Forms.Label();
            this.lblStockValor = new System.Windows.Forms.Label();
            this.pnlMain = new System.Windows.Forms.Panel();
            this.pnlTitulo.SuspendLayout();
            this.pnlReportes.SuspendLayout();
            this.pnlMain.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlTitulo
            // 
            this.pnlTitulo.BackColor = System.Drawing.Color.White;
            this.pnlTitulo.Controls.Add(this.lblTitulo);
            this.pnlTitulo.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlTitulo.Location = new System.Drawing.Point(20, 20);
            this.pnlTitulo.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlTitulo.Name = "pnlTitulo";
            this.pnlTitulo.Padding = new System.Windows.Forms.Padding(25, 25, 25, 25);
            this.pnlTitulo.Size = new System.Drawing.Size(1727, 120);
            this.pnlTitulo.TabIndex = 0;
            // 
            // lblTitulo
            // 
            this.lblTitulo.AutoSize = true;
            this.lblTitulo.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblTitulo.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblTitulo.Location = new System.Drawing.Point(25, 40);
            this.lblTitulo.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblTitulo.Name = "lblTitulo";
            this.lblTitulo.Size = new System.Drawing.Size(277, 41);
            this.lblTitulo.TabIndex = 0;
            this.lblTitulo.Text = "📊 Reportes Generales";
            // 
            // pnlReportes
            // 
            this.pnlReportes.BackColor = System.Drawing.Color.White;
            this.pnlReportes.Controls.Add(this.lblProduccion);
            this.pnlReportes.Controls.Add(this.lblVentas);
            this.pnlReportes.Controls.Add(this.lblStock);
            this.pnlReportes.Controls.Add(this.lblProduccionValor);
            this.pnlReportes.Controls.Add(this.lblVentasValor);
            this.pnlReportes.Controls.Add(this.lblStockValor);
            this.pnlReportes.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlReportes.Location = new System.Drawing.Point(20, 160);
            this.pnlReportes.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlReportes.Name = "pnlReportes";
            this.pnlReportes.Padding = new System.Windows.Forms.Padding(25, 25, 25, 25);
            this.pnlReportes.Size = new System.Drawing.Size(1727, 400);
            this.pnlReportes.TabIndex = 1;
            // 
            // lblProduccion
            // 
            this.lblProduccion.AutoSize = true;
            this.lblProduccion.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblProduccion.ForeColor = System.Drawing.Color.Teal;
            this.lblProduccion.Location = new System.Drawing.Point(25, 25);
            this.lblProduccion.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblProduccion.Name = "lblProduccion";
            this.lblProduccion.Size = new System.Drawing.Size(208, 28);
            this.lblProduccion.TabIndex = 0;
            this.lblProduccion.Text = "Total Producción";
            // 
            // lblVentas
            // 
            this.lblVentas.AutoSize = true;
            this.lblVentas.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblVentas.ForeColor = System.Drawing.Color.Teal;
            this.lblVentas.Location = new System.Drawing.Point(570, 25);
            this.lblVentas.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblVentas.Name = "lblVentas";
            this.lblVentas.Size = new System.Drawing.Size(156, 28);
            this.lblVentas.TabIndex = 1;
            this.lblVentas.Text = "Total Ventas";
            // 
            // lblStock
            // 
            this.lblStock.AutoSize = true;
            this.lblStock.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblStock.ForeColor = System.Drawing.Color.Teal;
            this.lblStock.Location = new System.Drawing.Point(1100, 25);
            this.lblStock.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblStock.Name = "lblStock";
            this.lblStock.Size = new System.Drawing.Size(135, 28);
            this.lblStock.TabIndex = 2;
            this.lblStock.Text = "Stock Actual";
            // 
            // lblProduccionValor
            // 
            this.lblProduccionValor.AutoSize = true;
            this.lblProduccionValor.Font = new System.Drawing.Font("Segoe UI", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblProduccionValor.ForeColor = System.Drawing.Color.Teal;
            this.lblProduccionValor.Location = new System.Drawing.Point(25, 80);
            this.lblProduccionValor.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblProduccionValor.Name = "lblProduccionValor";
            this.lblProduccionValor.Size = new System.Drawing.Size(317, 81);
            this.lblProduccionValor.TabIndex = 3;
            this.lblProduccionValor.Text = "12,340 🥚";
            // 
            // lblVentasValor
            // 
            this.lblVentasValor.AutoSize = true;
            this.lblVentasValor.Font = new System.Drawing.Font("Segoe UI", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblVentasValor.ForeColor = System.Drawing.Color.Teal;
            this.lblVentasValor.Location = new System.Drawing.Point(570, 80);
            this.lblVentasValor.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblVentasValor.Name = "lblVentasValor";
            this.lblVentasValor.Size = new System.Drawing.Size(311, 81);
            this.lblVentasValor.TabIndex = 4;
            this.lblVentasValor.Text = "$18,510";
            // 
            // lblStockValor
            // 
            this.lblStockValor.AutoSize = true;
            this.lblStockValor.Font = new System.Drawing.Font("Segoe UI", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblStockValor.ForeColor = System.Drawing.Color.Teal;
            this.lblStockValor.Location = new System.Drawing.Point(1100, 80);
            this.lblStockValor.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblStockValor.Name = "lblStockValor";
            this.lblStockValor.Size = new System.Drawing.Size(266, 81);
            this.lblStockValor.TabIndex = 5;
            this.lblStockValor.Text = "9,590 🟢";
            // 
            // pnlMain
            // 
            this.pnlMain.AutoScroll = true;
            this.pnlMain.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.pnlMain.Controls.Add(this.pnlReportes);
            this.pnlMain.Controls.Add(this.pnlTitulo);
            this.pnlMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMain.Location = new System.Drawing.Point(0, 0);
            this.pnlMain.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlMain.Name = "pnlMain";
            this.pnlMain.Padding = new System.Windows.Forms.Padding(20, 20, 20, 20);
            this.pnlMain.Size = new System.Drawing.Size(1767, 980);
            this.pnlMain.TabIndex = 3;
            // 
            // ReportesUserControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.Controls.Add(this.pnlMain);
            this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.Name = "ReportesUserControl";
            this.Size = new System.Drawing.Size(1767, 980);
            this.pnlTitulo.ResumeLayout(false);
            this.pnlTitulo.PerformLayout();
            this.pnlReportes.ResumeLayout(false);
            this.pnlReportes.PerformLayout();
            this.pnlMain.ResumeLayout(false);
            this.ResumeLayout(false);
        }

        #endregion

        private System.Windows.Forms.Panel pnlTitulo;
        private System.Windows.Forms.Label lblTitulo;
        private System.Windows.Forms.Panel pnlReportes;
        private System.Windows.Forms.Label lblProduccion;
        private System.Windows.Forms.Label lblVentas;
        private System.Windows.Forms.Label lblStock;
        private System.Windows.Forms.Label lblProduccionValor;
        private System.Windows.Forms.Label lblVentasValor;
        private System.Windows.Forms.Label lblStockValor;
        private System.Windows.Forms.Panel pnlMain;
    }
}
