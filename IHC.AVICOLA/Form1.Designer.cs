namespace IHC.AVICOLA
{
    partial class Form1
    {
        /// <summary>
        /// Variable del diseñador necesaria.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Limpiar los recursos que se estén usando.
        /// </summary>
        /// <param name="disposing">true si los recursos administrados se deben desechar; false en caso contrario.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Código generado por el Diseñador de Windows Forms

        /// <summary>
        /// Método necesario para admitir el Diseñador. No se puede modificar
        /// el contenido de este método con el editor de código.
        /// </summary>
        private void InitializeComponent()
        {
            this.pnlHeader = new System.Windows.Forms.Panel();
            this.lblTitle = new System.Windows.Forms.Label();
            this.btnTheme = new System.Windows.Forms.Button();
            this.pnlNav = new System.Windows.Forms.Panel();
            this.btnReportes = new System.Windows.Forms.Button();
            this.btnVentas = new System.Windows.Forms.Button();
            this.btnMolino = new System.Windows.Forms.Button();
            this.btnAlimento = new System.Windows.Forms.Button();
            this.btnAlmacen = new System.Windows.Forms.Button();
            this.btnProduccion = new System.Windows.Forms.Button();
            this.btnDashboard = new System.Windows.Forms.Button();
            this.pnlContent = new System.Windows.Forms.Panel();
            this.pnlHeader.SuspendLayout();
            this.pnlNav.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlHeader
            // 
            this.pnlHeader.BackColor = System.Drawing.Color.Teal;
            this.pnlHeader.Controls.Add(this.lblTitle);
            this.pnlHeader.Controls.Add(this.btnTheme);
            this.pnlHeader.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlHeader.Location = new System.Drawing.Point(0, 0);
            this.pnlHeader.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlHeader.Name = "pnlHeader";
            this.pnlHeader.Size = new System.Drawing.Size(1867, 86);
            this.pnlHeader.TabIndex = 0;
            // 
            // lblTitle
            // 
            this.lblTitle.AutoSize = true;
            this.lblTitle.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblTitle.ForeColor = System.Drawing.Color.White;
            this.lblTitle.Location = new System.Drawing.Point(27, 25);
            this.lblTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblTitle.Name = "lblTitle";
            this.lblTitle.Size = new System.Drawing.Size(620, 37);
            this.lblTitle.TabIndex = 0;
            this.lblTitle.Text = "🐔 Sistema Avícola - El Rancho del Buen Pastor";
            // 
            // btnTheme
            // 
            this.btnTheme.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnTheme.BackColor = System.Drawing.Color.White;
            this.btnTheme.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnTheme.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnTheme.ForeColor = System.Drawing.Color.Teal;
            this.btnTheme.Location = new System.Drawing.Point(1700, 20);
            this.btnTheme.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnTheme.Name = "btnTheme";
            this.btnTheme.Size = new System.Drawing.Size(133, 43);
            this.btnTheme.TabIndex = 1;
            this.btnTheme.Text = "🌙 Tema Oscuro";
            this.btnTheme.UseVisualStyleBackColor = false;
            // 
            // pnlNav
            // 
            this.pnlNav.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(150)))), ((int)(((byte)(150)))));
            this.pnlNav.Controls.Add(this.btnReportes);
            this.pnlNav.Controls.Add(this.btnVentas);
            this.pnlNav.Controls.Add(this.btnMolino);
            this.pnlNav.Controls.Add(this.btnAlimento);
            this.pnlNav.Controls.Add(this.btnAlmacen);
            this.pnlNav.Controls.Add(this.btnProduccion);
            this.pnlNav.Controls.Add(this.btnDashboard);
            this.pnlNav.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlNav.Location = new System.Drawing.Point(0, 86);
            this.pnlNav.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlNav.Name = "pnlNav";
            this.pnlNav.Size = new System.Drawing.Size(1867, 62);
            this.pnlNav.TabIndex = 1;
            // 
            // btnReportes
            // 
            this.btnReportes.BackColor = System.Drawing.Color.Transparent;
            this.btnReportes.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnReportes.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnReportes.ForeColor = System.Drawing.Color.White;
            this.btnReportes.Location = new System.Drawing.Point(960, 10);
            this.btnReportes.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnReportes.Name = "btnReportes";
            this.btnReportes.Size = new System.Drawing.Size(133, 43);
            this.btnReportes.TabIndex = 6;
            this.btnReportes.Text = "📊 Reportes";
            this.btnReportes.UseVisualStyleBackColor = false;
            // 
            // btnVentas
            // 
            this.btnVentas.BackColor = System.Drawing.Color.Transparent;
            this.btnVentas.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnVentas.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnVentas.ForeColor = System.Drawing.Color.White;
            this.btnVentas.Location = new System.Drawing.Point(827, 10);
            this.btnVentas.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnVentas.Name = "btnVentas";
            this.btnVentas.Size = new System.Drawing.Size(120, 43);
            this.btnVentas.TabIndex = 5;
            this.btnVentas.Text = "💰 Ventas";
            this.btnVentas.UseVisualStyleBackColor = false;
            // 
            // btnMolino
            // 
            this.btnMolino.BackColor = System.Drawing.Color.Transparent;
            this.btnMolino.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnMolino.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnMolino.ForeColor = System.Drawing.Color.White;
            this.btnMolino.Location = new System.Drawing.Point(693, 10);
            this.btnMolino.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnMolino.Name = "btnMolino";
            this.btnMolino.Size = new System.Drawing.Size(120, 43);
            this.btnMolino.TabIndex = 4;
            this.btnMolino.Text = "⚙️ Molino";
            this.btnMolino.UseVisualStyleBackColor = false;
            // 
            // btnAlimento
            // 
            this.btnAlimento.BackColor = System.Drawing.Color.Transparent;
            this.btnAlimento.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnAlimento.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnAlimento.ForeColor = System.Drawing.Color.White;
            this.btnAlimento.Location = new System.Drawing.Point(547, 10);
            this.btnAlimento.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnAlimento.Name = "btnAlimento";
            this.btnAlimento.Size = new System.Drawing.Size(133, 43);
            this.btnAlimento.TabIndex = 3;
            this.btnAlimento.Text = "🌾 Alimento";
            this.btnAlimento.UseVisualStyleBackColor = false;
            // 
            // btnAlmacen
            // 
            this.btnAlmacen.BackColor = System.Drawing.Color.Transparent;
            this.btnAlmacen.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnAlmacen.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnAlmacen.ForeColor = System.Drawing.Color.White;
            this.btnAlmacen.Location = new System.Drawing.Point(347, 10);
            this.btnAlmacen.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnAlmacen.Name = "btnAlmacen";
            this.btnAlmacen.Size = new System.Drawing.Size(187, 43);
            this.btnAlmacen.TabIndex = 2;
            this.btnAlmacen.Text = "📦 Almacén Huevos";
            this.btnAlmacen.UseVisualStyleBackColor = false;
            // 
            // btnProduccion
            // 
            this.btnProduccion.BackColor = System.Drawing.Color.Transparent;
            this.btnProduccion.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnProduccion.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnProduccion.ForeColor = System.Drawing.Color.White;
            this.btnProduccion.Location = new System.Drawing.Point(187, 10);
            this.btnProduccion.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnProduccion.Name = "btnProduccion";
            this.btnProduccion.Size = new System.Drawing.Size(147, 43);
            this.btnProduccion.TabIndex = 1;
            this.btnProduccion.Text = "⏱️ Producción";
            this.btnProduccion.UseVisualStyleBackColor = false;
            // 
            // btnDashboard
            // 
            this.btnDashboard.BackColor = System.Drawing.Color.White;
            this.btnDashboard.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnDashboard.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnDashboard.ForeColor = System.Drawing.Color.Teal;
            this.btnDashboard.Location = new System.Drawing.Point(27, 10);
            this.btnDashboard.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnDashboard.Name = "btnDashboard";
            this.btnDashboard.Size = new System.Drawing.Size(147, 43);
            this.btnDashboard.TabIndex = 0;
            this.btnDashboard.Text = "🏠 Dashboard";
            this.btnDashboard.UseVisualStyleBackColor = false;
            // 
            // pnlContent
            // 
            this.pnlContent.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.pnlContent.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlContent.Location = new System.Drawing.Point(0, 148);
            this.pnlContent.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlContent.Name = "pnlContent";
            this.pnlContent.Padding = new System.Windows.Forms.Padding(40, 37, 40, 37);
            this.pnlContent.Size = new System.Drawing.Size(1867, 815);
            this.pnlContent.TabIndex = 2;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1867, 963);
            this.Controls.Add(this.pnlContent);
            this.Controls.Add(this.pnlNav);
            this.Controls.Add(this.pnlHeader);
            this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.Name = "Form1";
            this.Text = "Sistema Avícola";
            this.pnlHeader.ResumeLayout(false);
            this.pnlHeader.PerformLayout();
            this.pnlNav.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlHeader;
        private System.Windows.Forms.Label lblTitle;
        private System.Windows.Forms.Button btnTheme;
        private System.Windows.Forms.Panel pnlNav;
        private System.Windows.Forms.Button btnDashboard;
        private System.Windows.Forms.Button btnProduccion;
        private System.Windows.Forms.Button btnAlmacen;
        private System.Windows.Forms.Button btnAlimento;
        private System.Windows.Forms.Button btnMolino;
        private System.Windows.Forms.Button btnVentas;
        private System.Windows.Forms.Button btnReportes;
        private System.Windows.Forms.Panel pnlContent;
    }
}
