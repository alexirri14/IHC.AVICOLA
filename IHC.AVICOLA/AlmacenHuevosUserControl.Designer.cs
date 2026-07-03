namespace IHC.AVICOLA
{
    partial class AlmacenHuevosUserControl
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
            this.pnlResumen = new System.Windows.Forms.Panel();
            this.lblStockTitle = new System.Windows.Forms.Label();
            this.lblStock = new System.Windows.Forms.Label();
            this.pnlDisponibles = new System.Windows.Forms.Panel();
            this.lblDisponibles = new System.Windows.Forms.Label();
            this.lblDisponiblesTitle = new System.Windows.Forms.Label();
            this.pnlMovimientos = new System.Windows.Forms.Panel();
            this.dgvMovimientos = new System.Windows.Forms.DataGridView();
            this.lblMovimientosTitle = new System.Windows.Forms.Label();
            this.pnlFormMovimiento = new System.Windows.Forms.Panel();
            this.lblError = new System.Windows.Forms.Label();
            this.btnCancelar = new System.Windows.Forms.Button();
            this.btnGuardar = new System.Windows.Forms.Button();
            this.txtCantidadMov = new System.Windows.Forms.TextBox();
            this.lblCantidadMov = new System.Windows.Forms.Label();
            this.cboGalpon = new System.Windows.Forms.ComboBox();
            this.lblGalpon = new System.Windows.Forms.Label();
            this.lblFormTitle = new System.Windows.Forms.Label();
            this.pnlMainContainer = new System.Windows.Forms.Panel();
            this.pnlResumen.SuspendLayout();
            this.pnlDisponibles.SuspendLayout();
            this.pnlMovimientos.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvMovimientos)).BeginInit();
            this.pnlFormMovimiento.SuspendLayout();
            this.pnlMainContainer.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlResumen
            // 
            this.pnlResumen.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlResumen.BackColor = System.Drawing.Color.White;
            this.pnlResumen.Controls.Add(this.pnlDisponibles);
            this.pnlResumen.Controls.Add(this.lblStockTitle);
            this.pnlResumen.Controls.Add(this.lblStock);
            this.pnlResumen.Location = new System.Drawing.Point(20, 20);
            this.pnlResumen.Margin = new System.Windows.Forms.Padding(4);
            this.pnlResumen.MinimumSize = new System.Drawing.Size(800, 250);
            this.pnlResumen.Name = "pnlResumen";
            this.pnlResumen.Padding = new System.Windows.Forms.Padding(25);
            this.pnlResumen.Size = new System.Drawing.Size(1727, 250);
            this.pnlResumen.TabIndex = 0;
            // 
            // lblStockTitle
            // 
            this.lblStockTitle.AutoSize = true;
            this.lblStockTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblStockTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblStockTitle.Location = new System.Drawing.Point(25, 25);
            this.lblStockTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblStockTitle.Name = "lblStockTitle";
            this.lblStockTitle.Size = new System.Drawing.Size(290, 41);
            this.lblStockTitle.TabIndex = 0;
            this.lblStockTitle.Text = "📦 Resumen de Stock";
            // 
            // lblStock
            // 
            this.lblStock.AutoSize = true;
            this.lblStock.Font = new System.Drawing.Font("Segoe UI", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblStock.ForeColor = System.Drawing.Color.Teal;
            this.lblStock.Location = new System.Drawing.Point(25, 85);
            this.lblStock.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblStock.Name = "lblStock";
            this.lblStock.Size = new System.Drawing.Size(577, 81);
            this.lblStock.TabIndex = 1;
            this.lblStock.Text = "9,590 Huevos";
            // 
            // pnlDisponibles
            // 
            this.pnlDisponibles.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(209)))), ((int)(((byte)(231)))), ((int)(((byte)(221)))));
            this.pnlDisponibles.Controls.Add(this.lblDisponibles);
            this.pnlDisponibles.Controls.Add(this.lblDisponiblesTitle);
            this.pnlDisponibles.Location = new System.Drawing.Point(650, 85);
            this.pnlDisponibles.Margin = new System.Windows.Forms.Padding(4);
            this.pnlDisponibles.Name = "pnlDisponibles";
            this.pnlDisponibles.Size = new System.Drawing.Size(480, 120);
            this.pnlDisponibles.TabIndex = 2;
            // 
            // lblDisponibles
            // 
            this.lblDisponibles.AutoSize = true;
            this.lblDisponibles.Font = new System.Drawing.Font("Segoe UI", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblDisponibles.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(21)))), ((int)(((byte)(71)))), ((int)(((byte)(52)))));
            this.lblDisponibles.Location = new System.Drawing.Point(25, 55);
            this.lblDisponibles.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblDisponibles.Name = "lblDisponibles";
            this.lblDisponibles.Size = new System.Drawing.Size(246, 54);
            this.lblDisponibles.TabIndex = 1;
            this.lblDisponibles.Text = "9,590 🟢";
            // 
            // lblDisponiblesTitle
            // 
            this.lblDisponiblesTitle.AutoSize = true;
            this.lblDisponiblesTitle.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblDisponiblesTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(21)))), ((int)(((byte)(71)))), ((int)(((byte)(52)))));
            this.lblDisponiblesTitle.Location = new System.Drawing.Point(25, 25);
            this.lblDisponiblesTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblDisponiblesTitle.Name = "lblDisponiblesTitle";
            this.lblDisponiblesTitle.Size = new System.Drawing.Size(117, 23);
            this.lblDisponiblesTitle.TabIndex = 0;
            this.lblDisponiblesTitle.Text = "Disponibles";
            // 
            // pnlMovimientos
            // 
            this.pnlMovimientos.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlMovimientos.BackColor = System.Drawing.Color.White;
            this.pnlMovimientos.Controls.Add(this.dgvMovimientos);
            this.pnlMovimientos.Controls.Add(this.lblMovimientosTitle);
            this.pnlMovimientos.Location = new System.Drawing.Point(20, 570);
            this.pnlMovimientos.Margin = new System.Windows.Forms.Padding(4);
            this.pnlMovimientos.MinimumSize = new System.Drawing.Size(800, 300);
            this.pnlMovimientos.Name = "pnlMovimientos";
            this.pnlMovimientos.Padding = new System.Windows.Forms.Padding(25);
            this.pnlMovimientos.Size = new System.Drawing.Size(1727, 610);
            this.pnlMovimientos.TabIndex = 2;
            // 
            // dgvMovimientos
            // 
            this.dgvMovimientos.AllowUserToAddRows = false;
            this.dgvMovimientos.AllowUserToDeleteRows = false;
            this.dgvMovimientos.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.dgvMovimientos.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvMovimientos.BackgroundColor = System.Drawing.Color.White;
            this.dgvMovimientos.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvMovimientos.Location = new System.Drawing.Point(25, 75);
            this.dgvMovimientos.Margin = new System.Windows.Forms.Padding(4);
            this.dgvMovimientos.Name = "dgvMovimientos";
            this.dgvMovimientos.ReadOnly = true;
            this.dgvMovimientos.RowHeadersWidth = 51;
            this.dgvMovimientos.Size = new System.Drawing.Size(1677, 510);
            this.dgvMovimientos.TabIndex = 1;
            // 
            // lblMovimientosTitle
            // 
            this.lblMovimientosTitle.AutoSize = true;
            this.lblMovimientosTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblMovimientosTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblMovimientosTitle.Location = new System.Drawing.Point(25, 25);
            this.lblMovimientosTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblMovimientosTitle.Name = "lblMovimientosTitle";
            this.lblMovimientosTitle.Size = new System.Drawing.Size(510, 41);
            this.lblMovimientosTitle.TabIndex = 0;
            this.lblMovimientosTitle.Text = "📋 Ingresos desde Galpón";
            // 
            // pnlFormMovimiento
            // 
            this.pnlFormMovimiento.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlFormMovimiento.BackColor = System.Drawing.Color.White;
            this.pnlFormMovimiento.Controls.Add(this.lblError);
            this.pnlFormMovimiento.Controls.Add(this.btnCancelar);
            this.pnlFormMovimiento.Controls.Add(this.btnGuardar);
            this.pnlFormMovimiento.Controls.Add(this.txtCantidadMov);
            this.pnlFormMovimiento.Controls.Add(this.lblCantidadMov);
            this.pnlFormMovimiento.Controls.Add(this.cboGalpon);
            this.pnlFormMovimiento.Controls.Add(this.lblGalpon);
            this.pnlFormMovimiento.Controls.Add(this.lblFormTitle);
            this.pnlFormMovimiento.Location = new System.Drawing.Point(20, 290);
            this.pnlFormMovimiento.Margin = new System.Windows.Forms.Padding(4);
            this.pnlFormMovimiento.MinimumSize = new System.Drawing.Size(800, 260);
            this.pnlFormMovimiento.Name = "pnlFormMovimiento";
            this.pnlFormMovimiento.Padding = new System.Windows.Forms.Padding(25);
            this.pnlFormMovimiento.Size = new System.Drawing.Size(1727, 260);
            this.pnlFormMovimiento.TabIndex = 1;
            // 
            // lblError
            // 
            this.lblError.AutoSize = true;
            this.lblError.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblError.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(220)))), ((int)(((byte)(53)))), ((int)(((byte)(69)))));
            this.lblError.Location = new System.Drawing.Point(25, 145);
            this.lblError.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblError.Name = "lblError";
            this.lblError.Size = new System.Drawing.Size(330, 20);
            this.lblError.TabIndex = 9;
            this.lblError.Text = "⚠️ Por favor complete todos los campos obligatorios";
            this.lblError.Visible = false;
            // 
            // btnCancelar
            // 
            this.btnCancelar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnCancelar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(108)))), ((int)(((byte)(117)))), ((int)(((byte)(125)))));
            this.btnCancelar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCancelar.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnCancelar.ForeColor = System.Drawing.Color.White;
            this.btnCancelar.Location = new System.Drawing.Point(1443, 170);
            this.btnCancelar.Margin = new System.Windows.Forms.Padding(4);
            this.btnCancelar.Name = "btnCancelar";
            this.btnCancelar.Size = new System.Drawing.Size(200, 50);
            this.btnCancelar.TabIndex = 8;
            this.btnCancelar.Text = "✕ Cancelar";
            this.btnCancelar.UseVisualStyleBackColor = false;
            // 
            // btnGuardar
            // 
            this.btnGuardar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnGuardar.BackColor = System.Drawing.Color.Teal;
            this.btnGuardar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnGuardar.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnGuardar.ForeColor = System.Drawing.Color.White;
            this.btnGuardar.Location = new System.Drawing.Point(1235, 170);
            this.btnGuardar.Margin = new System.Windows.Forms.Padding(4);
            this.btnGuardar.Name = "btnGuardar";
            this.btnGuardar.Size = new System.Drawing.Size(200, 50);
            this.btnGuardar.TabIndex = 7;
            this.btnGuardar.Text = "💾 Registrar";
            this.btnGuardar.UseVisualStyleBackColor = false;
            // 
            // txtCantidadMov
            // 
            this.txtCantidadMov.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtCantidadMov.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtCantidadMov.Location = new System.Drawing.Point(410, 105);
            this.txtCantidadMov.Margin = new System.Windows.Forms.Padding(4);
            this.txtCantidadMov.Name = "txtCantidadMov";
            this.txtCantidadMov.Size = new System.Drawing.Size(360, 30);
            this.txtCantidadMov.TabIndex = 6;
            // 
            // lblCantidadMov
            // 
            this.lblCantidadMov.AutoSize = true;
            this.lblCantidadMov.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblCantidadMov.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblCantidadMov.Location = new System.Drawing.Point(410, 75);
            this.lblCantidadMov.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblCantidadMov.Name = "lblCantidadMov";
            this.lblCantidadMov.Size = new System.Drawing.Size(84, 23);
            this.lblCantidadMov.TabIndex = 5;
            this.lblCantidadMov.Text = "Cantidad*";
            // 
            // cboGalpon
            // 
            this.cboGalpon.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.cboGalpon.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboGalpon.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.cboGalpon.FormattingEnabled = true;
            this.cboGalpon.Items.AddRange(new object[] {
            "Galpón A",
            "Galpón B",
            "Galpón C",
            "Galpón D",
            "Galpón E"});
            this.cboGalpon.Location = new System.Drawing.Point(25, 105);
            this.cboGalpon.Margin = new System.Windows.Forms.Padding(4);
            this.cboGalpon.Name = "cboGalpon";
            this.cboGalpon.Size = new System.Drawing.Size(360, 31);
            this.cboGalpon.TabIndex = 2;
            // 
            // lblGalpon
            // 
            this.lblGalpon.AutoSize = true;
            this.lblGalpon.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblGalpon.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblGalpon.Location = new System.Drawing.Point(25, 75);
            this.lblGalpon.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblGalpon.Name = "lblGalpon";
            this.lblGalpon.Size = new System.Drawing.Size(126, 23);
            this.lblGalpon.TabIndex = 1;
            this.lblGalpon.Text = "Galpón Origen*";
            // 
            // lblFormTitle
            // 
            this.lblFormTitle.AutoSize = true;
            this.lblFormTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblFormTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblFormTitle.Location = new System.Drawing.Point(25, 25);
            this.lblFormTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblFormTitle.Name = "lblFormTitle";
            this.lblFormTitle.Size = new System.Drawing.Size(477, 41);
            this.lblFormTitle.TabIndex = 0;
            this.lblFormTitle.Text = "➕ Nuevo Ingreso desde Galpón";
            // 
            // pnlMainContainer
            // 
            this.pnlMainContainer.AutoScroll = true;
            this.pnlMainContainer.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.pnlMainContainer.Controls.Add(this.pnlMovimientos);
            this.pnlMainContainer.Controls.Add(this.pnlFormMovimiento);
            this.pnlMainContainer.Controls.Add(this.pnlResumen);
            this.pnlMainContainer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMainContainer.Location = new System.Drawing.Point(0, 0);
            this.pnlMainContainer.Margin = new System.Windows.Forms.Padding(4);
            this.pnlMainContainer.Name = "pnlMainContainer";
            this.pnlMainContainer.Padding = new System.Windows.Forms.Padding(20, 20, 20, 20);
            this.pnlMainContainer.Size = new System.Drawing.Size(1767, 1200);
            this.pnlMainContainer.TabIndex = 3;
            // 
            // AlmacenHuevosUserControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.Controls.Add(this.pnlMainContainer);
            this.Margin = new System.Windows.Forms.Padding(4);
            this.Name = "AlmacenHuevosUserControl";
            this.Size = new System.Drawing.Size(1767, 1200);
            this.pnlResumen.ResumeLayout(false);
            this.pnlResumen.PerformLayout();
            this.pnlDisponibles.ResumeLayout(false);
            this.pnlDisponibles.PerformLayout();
            this.pnlMovimientos.ResumeLayout(false);
            this.pnlMovimientos.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvMovimientos)).EndInit();
            this.pnlFormMovimiento.ResumeLayout(false);
            this.pnlFormMovimiento.PerformLayout();
            this.pnlMainContainer.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlResumen;
        private System.Windows.Forms.Label lblStockTitle;
        private System.Windows.Forms.Label lblStock;
        private System.Windows.Forms.Panel pnlDisponibles;
        private System.Windows.Forms.Label lblDisponibles;
        private System.Windows.Forms.Label lblDisponiblesTitle;
        private System.Windows.Forms.Panel pnlMovimientos;
        private System.Windows.Forms.DataGridView dgvMovimientos;
        private System.Windows.Forms.Label lblMovimientosTitle;
        private System.Windows.Forms.Panel pnlFormMovimiento;
        private System.Windows.Forms.Label lblError;
        private System.Windows.Forms.Button btnCancelar;
        private System.Windows.Forms.Button btnGuardar;
        private System.Windows.Forms.TextBox txtCantidadMov;
        private System.Windows.Forms.Label lblCantidadMov;
        private System.Windows.Forms.ComboBox cboGalpon;
        private System.Windows.Forms.Label lblGalpon;
        private System.Windows.Forms.Label lblFormTitle;
        private System.Windows.Forms.Panel pnlMainContainer;
    }
}
