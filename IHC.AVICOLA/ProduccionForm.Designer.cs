namespace IHC.AVICOLA
{
    partial class ProduccionForm
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
            this.pnlHeader = new System.Windows.Forms.Panel();
            this.lblTitle = new System.Windows.Forms.Label();
            this.pnlNav = new System.Windows.Forms.Panel();
            this.btnReportes = new System.Windows.Forms.Button();
            this.btnVentas = new System.Windows.Forms.Button();
            this.btnMolino = new System.Windows.Forms.Button();
            this.btnAlimento = new System.Windows.Forms.Button();
            this.btnAlmacen = new System.Windows.Forms.Button();
            this.btnProduccion = new System.Windows.Forms.Button();
            this.btnDashboard = new System.Windows.Forms.Button();
            this.pnlMain = new System.Windows.Forms.Panel();
            this.pnlGalpones = new System.Windows.Forms.Panel();
            this.dgvGalpones = new System.Windows.Forms.DataGridView();
            this.lblGalponesTitle = new System.Windows.Forms.Label();
            this.pnlFormProduccion = new System.Windows.Forms.Panel();
            this.btnCancelar = new System.Windows.Forms.Button();
            this.btnGuardar = new System.Windows.Forms.Button();
            this.txtCantidad = new System.Windows.Forms.TextBox();
            this.lblCantidad = new System.Windows.Forms.Label();
            this.dtpFecha = new System.Windows.Forms.DateTimePicker();
            this.lblFecha = new System.Windows.Forms.Label();
            this.cboGalpon = new System.Windows.Forms.ComboBox();
            this.lblGalpon = new System.Windows.Forms.Label();
            this.lblRegistroTitle = new System.Windows.Forms.Label();
            this.pnlHeader.SuspendLayout();
            this.pnlNav.SuspendLayout();
            this.pnlMain.SuspendLayout();
            this.pnlGalpones.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvGalpones)).BeginInit();
            this.pnlFormProduccion.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlHeader
            // 
            this.pnlHeader.BackColor = System.Drawing.Color.Teal;
            this.pnlHeader.Controls.Add(this.lblTitle);
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
            this.btnProduccion.BackColor = System.Drawing.Color.White;
            this.btnProduccion.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnProduccion.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnProduccion.ForeColor = System.Drawing.Color.Teal;
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
            this.btnDashboard.BackColor = System.Drawing.Color.Transparent;
            this.btnDashboard.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnDashboard.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnDashboard.ForeColor = System.Drawing.Color.White;
            this.btnDashboard.Location = new System.Drawing.Point(27, 10);
            this.btnDashboard.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnDashboard.Name = "btnDashboard";
            this.btnDashboard.Size = new System.Drawing.Size(147, 43);
            this.btnDashboard.TabIndex = 0;
            this.btnDashboard.Text = "🏠 Dashboard";
            this.btnDashboard.UseVisualStyleBackColor = false;
            this.btnDashboard.Click += new System.EventHandler(this.btnDashboard_Click_1);
            // 
            // pnlMain
            // 
            this.pnlMain.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.pnlMain.Controls.Add(this.pnlGalpones);
            this.pnlMain.Controls.Add(this.pnlFormProduccion);
            this.pnlMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMain.Location = new System.Drawing.Point(0, 148);
            this.pnlMain.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlMain.Name = "pnlMain";
            this.pnlMain.Padding = new System.Windows.Forms.Padding(40, 37, 40, 37);
            this.pnlMain.Size = new System.Drawing.Size(1867, 837);
            this.pnlMain.TabIndex = 2;
            // 
            // pnlGalpones
            // 
            this.pnlGalpones.BackColor = System.Drawing.Color.White;
            this.pnlGalpones.Controls.Add(this.dgvGalpones);
            this.pnlGalpones.Controls.Add(this.lblGalponesTitle);
            this.pnlGalpones.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlGalpones.Location = new System.Drawing.Point(40, 283);
            this.pnlGalpones.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlGalpones.Name = "pnlGalpones";
            this.pnlGalpones.Size = new System.Drawing.Size(1787, 517);
            this.pnlGalpones.TabIndex = 1;
            // 
            // dgvGalpones
            // 
            this.dgvGalpones.AllowUserToAddRows = false;
            this.dgvGalpones.AllowUserToDeleteRows = false;
            this.dgvGalpones.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvGalpones.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvGalpones.Location = new System.Drawing.Point(27, 74);
            this.dgvGalpones.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.dgvGalpones.Name = "dgvGalpones";
            this.dgvGalpones.ReadOnly = true;
            this.dgvGalpones.RowHeadersWidth = 51;
            this.dgvGalpones.Size = new System.Drawing.Size(1733, 418);
            this.dgvGalpones.TabIndex = 1;
            // 
            // lblGalponesTitle
            // 
            this.lblGalponesTitle.AutoSize = true;
            this.lblGalponesTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblGalponesTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(41)))), ((int)(((byte)(59)))));
            this.lblGalponesTitle.Location = new System.Drawing.Point(27, 25);
            this.lblGalponesTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblGalponesTitle.Name = "lblGalponesTitle";
            this.lblGalponesTitle.Size = new System.Drawing.Size(330, 41);
            this.lblGalponesTitle.TabIndex = 0;
            this.lblGalponesTitle.Text = "📋 Producción del día";
            // 
            // pnlFormProduccion
            // 
            this.pnlFormProduccion.BackColor = System.Drawing.Color.White;
            this.pnlFormProduccion.Controls.Add(this.btnCancelar);
            this.pnlFormProduccion.Controls.Add(this.btnGuardar);
            this.pnlFormProduccion.Controls.Add(this.txtCantidad);
            this.pnlFormProduccion.Controls.Add(this.lblCantidad);
            this.pnlFormProduccion.Controls.Add(this.dtpFecha);
            this.pnlFormProduccion.Controls.Add(this.lblFecha);
            this.pnlFormProduccion.Controls.Add(this.cboGalpon);
            this.pnlFormProduccion.Controls.Add(this.lblGalpon);
            this.pnlFormProduccion.Controls.Add(this.lblRegistroTitle);
            this.pnlFormProduccion.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlFormProduccion.Location = new System.Drawing.Point(40, 37);
            this.pnlFormProduccion.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlFormProduccion.Name = "pnlFormProduccion";
            this.pnlFormProduccion.Size = new System.Drawing.Size(1787, 246);
            this.pnlFormProduccion.TabIndex = 0;
            // 
            // btnCancelar
            // 
            this.btnCancelar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(107)))), ((int)(((byte)(114)))), ((int)(((byte)(128)))));
            this.btnCancelar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCancelar.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnCancelar.ForeColor = System.Drawing.Color.White;
            this.btnCancelar.Location = new System.Drawing.Point(200, 172);
            this.btnCancelar.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnCancelar.Name = "btnCancelar";
            this.btnCancelar.Size = new System.Drawing.Size(160, 49);
            this.btnCancelar.TabIndex = 8;
            this.btnCancelar.Text = "✖️ Cancelar";
            this.btnCancelar.UseVisualStyleBackColor = false;
            // 
            // btnGuardar
            // 
            this.btnGuardar.BackColor = System.Drawing.Color.Teal;
            this.btnGuardar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnGuardar.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnGuardar.ForeColor = System.Drawing.Color.White;
            this.btnGuardar.Location = new System.Drawing.Point(27, 172);
            this.btnGuardar.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnGuardar.Name = "btnGuardar";
            this.btnGuardar.Size = new System.Drawing.Size(160, 49);
            this.btnGuardar.TabIndex = 7;
            this.btnGuardar.Text = "💾 Guardar";
            this.btnGuardar.UseVisualStyleBackColor = false;
            // 
            // txtCantidad
            // 
            this.txtCantidad.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtCantidad.Location = new System.Drawing.Point(747, 117);
            this.txtCantidad.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.txtCantidad.Name = "txtCantidad";
            this.txtCantidad.Size = new System.Drawing.Size(265, 30);
            this.txtCantidad.TabIndex = 6;
            // 
            // lblCantidad
            // 
            this.lblCantidad.AutoSize = true;
            this.lblCantidad.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblCantidad.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(71)))), ((int)(((byte)(85)))), ((int)(((byte)(105)))));
            this.lblCantidad.Location = new System.Drawing.Point(747, 86);
            this.lblCantidad.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblCantidad.Name = "lblCantidad";
            this.lblCantidad.Size = new System.Drawing.Size(79, 23);
            this.lblCantidad.TabIndex = 5;
            this.lblCantidad.Text = "Cantidad";
            // 
            // dtpFecha
            // 
            this.dtpFecha.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.dtpFecha.Location = new System.Drawing.Point(320, 117);
            this.dtpFecha.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.dtpFecha.Name = "dtpFecha";
            this.dtpFecha.Size = new System.Drawing.Size(399, 30);
            this.dtpFecha.TabIndex = 4;
            // 
            // lblFecha
            // 
            this.lblFecha.AutoSize = true;
            this.lblFecha.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblFecha.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(71)))), ((int)(((byte)(85)))), ((int)(((byte)(105)))));
            this.lblFecha.Location = new System.Drawing.Point(320, 86);
            this.lblFecha.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblFecha.Name = "lblFecha";
            this.lblFecha.Size = new System.Drawing.Size(54, 23);
            this.lblFecha.TabIndex = 3;
            this.lblFecha.Text = "Fecha";
            // 
            // cboGalpon
            // 
            this.cboGalpon.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboGalpon.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.cboGalpon.FormattingEnabled = true;
            this.cboGalpon.Items.AddRange(new object[] {
            "Galpón 1",
            "Galpón 2",
            "Galpón 3",
            "Galpón 4"});
            this.cboGalpon.Location = new System.Drawing.Point(27, 117);
            this.cboGalpon.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.cboGalpon.Name = "cboGalpon";
            this.cboGalpon.Size = new System.Drawing.Size(265, 31);
            this.cboGalpon.TabIndex = 2;
            // 
            // lblGalpon
            // 
            this.lblGalpon.AutoSize = true;
            this.lblGalpon.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblGalpon.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(71)))), ((int)(((byte)(85)))), ((int)(((byte)(105)))));
            this.lblGalpon.Location = new System.Drawing.Point(27, 86);
            this.lblGalpon.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblGalpon.Name = "lblGalpon";
            this.lblGalpon.Size = new System.Drawing.Size(65, 23);
            this.lblGalpon.TabIndex = 1;
            this.lblGalpon.Text = "Galpón";
            // 
            // lblRegistroTitle
            // 
            this.lblRegistroTitle.AutoSize = true;
            this.lblRegistroTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblRegistroTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(41)))), ((int)(((byte)(59)))));
            this.lblRegistroTitle.Location = new System.Drawing.Point(27, 25);
            this.lblRegistroTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblRegistroTitle.Name = "lblRegistroTitle";
            this.lblRegistroTitle.Size = new System.Drawing.Size(395, 41);
            this.lblRegistroTitle.TabIndex = 0;
            this.lblRegistroTitle.Text = "📋 Registro de Producción";
            // 
            // ProduccionForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1867, 985);
            this.Controls.Add(this.pnlMain);
            this.Controls.Add(this.pnlNav);
            this.Controls.Add(this.pnlHeader);
            this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.Name = "ProduccionForm";
            this.Text = "Sistema Avícola - Producción";
            this.pnlHeader.ResumeLayout(false);
            this.pnlHeader.PerformLayout();
            this.pnlNav.ResumeLayout(false);
            this.pnlMain.ResumeLayout(false);
            this.pnlGalpones.ResumeLayout(false);
            this.pnlGalpones.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvGalpones)).EndInit();
            this.pnlFormProduccion.ResumeLayout(false);
            this.pnlFormProduccion.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlHeader;
        private System.Windows.Forms.Label lblTitle;
        private System.Windows.Forms.Panel pnlNav;
        private System.Windows.Forms.Button btnDashboard;
        private System.Windows.Forms.Button btnProduccion;
        private System.Windows.Forms.Button btnAlmacen;
        private System.Windows.Forms.Button btnAlimento;
        private System.Windows.Forms.Button btnMolino;
        private System.Windows.Forms.Button btnVentas;
        private System.Windows.Forms.Button btnReportes;
        private System.Windows.Forms.Panel pnlMain;
        private System.Windows.Forms.Panel pnlGalpones;
        private System.Windows.Forms.DataGridView dgvGalpones;
        private System.Windows.Forms.Label lblGalponesTitle;
        private System.Windows.Forms.Panel pnlFormProduccion;
        private System.Windows.Forms.Button btnCancelar;
        private System.Windows.Forms.Button btnGuardar;
        private System.Windows.Forms.TextBox txtCantidad;
        private System.Windows.Forms.Label lblCantidad;
        private System.Windows.Forms.DateTimePicker dtpFecha;
        private System.Windows.Forms.Label lblFecha;
        private System.Windows.Forms.ComboBox cboGalpon;
        private System.Windows.Forms.Label lblGalpon;
        private System.Windows.Forms.Label lblRegistroTitle;
    }
}
