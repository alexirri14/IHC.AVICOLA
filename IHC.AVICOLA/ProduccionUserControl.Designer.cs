namespace IHC.AVICOLA
{
    partial class ProduccionUserControl
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
            this.pnlFormProduccion = new System.Windows.Forms.Panel();
            this.lblError = new System.Windows.Forms.Label();
            this.btnCancelar = new System.Windows.Forms.Button();
            this.btnGuardar = new System.Windows.Forms.Button();
            this.txtCantidad = new System.Windows.Forms.TextBox();
            this.lblCantidad = new System.Windows.Forms.Label();
            this.dtpFecha = new System.Windows.Forms.DateTimePicker();
            this.lblFecha = new System.Windows.Forms.Label();
            this.cboGalpon = new System.Windows.Forms.ComboBox();
            this.lblGalpon = new System.Windows.Forms.Label();
            this.lblRegistroTitle = new System.Windows.Forms.Label();
            this.pnlProduccionDia = new System.Windows.Forms.Panel();
            this.lblTotal = new System.Windows.Forms.Label();
            this.dgvProduccion = new System.Windows.Forms.DataGridView();
            this.lblProduccionDiaTitle = new System.Windows.Forms.Label();
            this.pnlMainContainer = new System.Windows.Forms.Panel();
            this.pnlFormProduccion.SuspendLayout();
            this.pnlProduccionDia.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvProduccion)).BeginInit();
            this.pnlMainContainer.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlFormProduccion
            // 
            this.pnlFormProduccion.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlFormProduccion.BackColor = System.Drawing.Color.White;
            this.pnlFormProduccion.Controls.Add(this.lblError);
            this.pnlFormProduccion.Controls.Add(this.btnCancelar);
            this.pnlFormProduccion.Controls.Add(this.btnGuardar);
            this.pnlFormProduccion.Controls.Add(this.txtCantidad);
            this.pnlFormProduccion.Controls.Add(this.lblCantidad);
            this.pnlFormProduccion.Controls.Add(this.dtpFecha);
            this.pnlFormProduccion.Controls.Add(this.lblFecha);
            this.pnlFormProduccion.Controls.Add(this.cboGalpon);
            this.pnlFormProduccion.Controls.Add(this.lblGalpon);
            this.pnlFormProduccion.Controls.Add(this.lblRegistroTitle);
            this.pnlFormProduccion.Location = new System.Drawing.Point(20, 20);
            this.pnlFormProduccion.Margin = new System.Windows.Forms.Padding(4);
            this.pnlFormProduccion.MinimumSize = new System.Drawing.Size(800, 300);
            this.pnlFormProduccion.Name = "pnlFormProduccion";
            this.pnlFormProduccion.Padding = new System.Windows.Forms.Padding(25);
            this.pnlFormProduccion.Size = new System.Drawing.Size(1727, 300);
            this.pnlFormProduccion.TabIndex = 0;
            // 
            // lblError
            // 
            this.lblError.AutoSize = true;
            this.lblError.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblError.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(220)))), ((int)(((byte)(53)))), ((int)(((byte)(69)))));
            this.lblError.Location = new System.Drawing.Point(29, 210);
            this.lblError.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblError.Name = "lblError";
            this.lblError.Size = new System.Drawing.Size(366, 20);
            this.lblError.TabIndex = 9;
            this.lblError.Text = "⚠️ Por favor complete todos los campos obligatorios";
            this.lblError.Visible = false;
            // 
            // btnCancelar
            // 
            this.btnCancelar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(108)))), ((int)(((byte)(117)))), ((int)(((byte)(125)))));
            this.btnCancelar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCancelar.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnCancelar.ForeColor = System.Drawing.Color.White;
            this.btnCancelar.Location = new System.Drawing.Point(249, 240);
            this.btnCancelar.Margin = new System.Windows.Forms.Padding(4);
            this.btnCancelar.Name = "btnCancelar";
            this.btnCancelar.Size = new System.Drawing.Size(200, 45);
            this.btnCancelar.TabIndex = 8;
            this.btnCancelar.Text = "✕ Cancelar";
            this.btnCancelar.UseVisualStyleBackColor = false;
            // 
            // btnGuardar
            // 
            this.btnGuardar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(20)))), ((int)(((byte)(184)))), ((int)(((byte)(166)))));
            this.btnGuardar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnGuardar.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnGuardar.ForeColor = System.Drawing.Color.White;
            this.btnGuardar.Location = new System.Drawing.Point(29, 240);
            this.btnGuardar.Margin = new System.Windows.Forms.Padding(4);
            this.btnGuardar.Name = "btnGuardar";
            this.btnGuardar.Size = new System.Drawing.Size(200, 45);
            this.btnGuardar.TabIndex = 7;
            this.btnGuardar.Text = "💾 Guardar";
            this.btnGuardar.UseVisualStyleBackColor = false;
            // 
            // txtCantidad
            // 
            this.txtCantidad.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtCantidad.Location = new System.Drawing.Point(790, 90);
            this.txtCantidad.Margin = new System.Windows.Forms.Padding(4);
            this.txtCantidad.Name = "txtCantidad";
            this.txtCantidad.Size = new System.Drawing.Size(300, 30);
            this.txtCantidad.TabIndex = 6;
            // 
            // lblCantidad
            // 
            this.lblCantidad.AutoSize = true;
            this.lblCantidad.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblCantidad.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(55)))), ((int)(((byte)(65)))), ((int)(((byte)(81)))));
            this.lblCantidad.Location = new System.Drawing.Point(790, 60);
            this.lblCantidad.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblCantidad.Name = "lblCantidad";
            this.lblCantidad.Size = new System.Drawing.Size(79, 23);
            this.lblCantidad.TabIndex = 5;
            this.lblCantidad.Text = "Cantidad";
            // 
            // dtpFecha
            // 
            this.dtpFecha.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.dtpFecha.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.dtpFecha.Location = new System.Drawing.Point(410, 90);
            this.dtpFecha.Margin = new System.Windows.Forms.Padding(4);
            this.dtpFecha.Name = "dtpFecha";
            this.dtpFecha.Size = new System.Drawing.Size(300, 30);
            this.dtpFecha.TabIndex = 4;
            // 
            // lblFecha
            // 
            this.lblFecha.AutoSize = true;
            this.lblFecha.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblFecha.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(55)))), ((int)(((byte)(65)))), ((int)(((byte)(81)))));
            this.lblFecha.Location = new System.Drawing.Point(410, 60);
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
            this.cboGalpon.Location = new System.Drawing.Point(29, 90);
            this.cboGalpon.Margin = new System.Windows.Forms.Padding(4);
            this.cboGalpon.Name = "cboGalpon";
            this.cboGalpon.Size = new System.Drawing.Size(300, 31);
            this.cboGalpon.TabIndex = 2;
            // 
            // lblGalpon
            // 
            this.lblGalpon.AutoSize = true;
            this.lblGalpon.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblGalpon.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(55)))), ((int)(((byte)(65)))), ((int)(((byte)(81)))));
            this.lblGalpon.Location = new System.Drawing.Point(29, 60);
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
            this.lblRegistroTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(24)))), ((int)(((byte)(39)))));
            this.lblRegistroTitle.Location = new System.Drawing.Point(29, 15);
            this.lblRegistroTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblRegistroTitle.Name = "lblRegistroTitle";
            this.lblRegistroTitle.Size = new System.Drawing.Size(345, 41);
            this.lblRegistroTitle.TabIndex = 0;
            this.lblRegistroTitle.Text = "Registro de Producción";
            // 
            // pnlProduccionDia
            // 
            this.pnlProduccionDia.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlProduccionDia.BackColor = System.Drawing.Color.White;
            this.pnlProduccionDia.Controls.Add(this.lblTotal);
            this.pnlProduccionDia.Controls.Add(this.dgvProduccion);
            this.pnlProduccionDia.Controls.Add(this.lblProduccionDiaTitle);
            this.pnlProduccionDia.Location = new System.Drawing.Point(20, 340);
            this.pnlProduccionDia.Margin = new System.Windows.Forms.Padding(4);
            this.pnlProduccionDia.MinimumSize = new System.Drawing.Size(800, 450);
            this.pnlProduccionDia.Name = "pnlProduccionDia";
            this.pnlProduccionDia.Padding = new System.Windows.Forms.Padding(25);
            this.pnlProduccionDia.Size = new System.Drawing.Size(1727, 500);
            this.pnlProduccionDia.TabIndex = 1;
            // 
            // lblTotal
            // 
            this.lblTotal.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblTotal.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(240)))), ((int)(((byte)(253)))), ((int)(((byte)(250)))));
            this.lblTotal.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblTotal.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(20)))), ((int)(((byte)(184)))), ((int)(((byte)(166)))));
            this.lblTotal.Location = new System.Drawing.Point(29, 415);
            this.lblTotal.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblTotal.Name = "lblTotal";
            this.lblTotal.Padding = new System.Windows.Forms.Padding(15);
            this.lblTotal.Size = new System.Drawing.Size(1670, 60);
            this.lblTotal.TabIndex = 2;
            this.lblTotal.Text = "Total del día: 0 huevos";
            this.lblTotal.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // dgvProduccion
            // 
            this.dgvProduccion.AllowUserToAddRows = false;
            this.dgvProduccion.AllowUserToDeleteRows = false;
            this.dgvProduccion.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.dgvProduccion.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvProduccion.BackgroundColor = System.Drawing.Color.White;
            this.dgvProduccion.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvProduccion.Location = new System.Drawing.Point(29, 80);
            this.dgvProduccion.Margin = new System.Windows.Forms.Padding(4);
            this.dgvProduccion.Name = "dgvProduccion";
            this.dgvProduccion.ReadOnly = true;
            this.dgvProduccion.RowHeadersVisible = false;
            this.dgvProduccion.RowHeadersWidth = 51;
            this.dgvProduccion.Size = new System.Drawing.Size(1670, 330);
            this.dgvProduccion.TabIndex = 1;
            // 
            // lblProduccionDiaTitle
            // 
            this.lblProduccionDiaTitle.AutoSize = true;
            this.lblProduccionDiaTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblProduccionDiaTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(24)))), ((int)(((byte)(39)))));
            this.lblProduccionDiaTitle.Location = new System.Drawing.Point(29, 20);
            this.lblProduccionDiaTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblProduccionDiaTitle.Name = "lblProduccionDiaTitle";
            this.lblProduccionDiaTitle.Size = new System.Drawing.Size(330, 41);
            this.lblProduccionDiaTitle.TabIndex = 0;
            this.lblProduccionDiaTitle.Text = "📋 Producción del día";
            // 
            // pnlMainContainer
            // 
            this.pnlMainContainer.AutoScroll = true;
            this.pnlMainContainer.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.pnlMainContainer.Controls.Add(this.pnlProduccionDia);
            this.pnlMainContainer.Controls.Add(this.pnlFormProduccion);
            this.pnlMainContainer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMainContainer.Location = new System.Drawing.Point(0, 0);
            this.pnlMainContainer.Margin = new System.Windows.Forms.Padding(4);
            this.pnlMainContainer.Name = "pnlMainContainer";
            this.pnlMainContainer.Padding = new System.Windows.Forms.Padding(20);
            this.pnlMainContainer.Size = new System.Drawing.Size(1767, 850);
            this.pnlMainContainer.TabIndex = 2;
            // 
            // ProduccionUserControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.Controls.Add(this.pnlMainContainer);
            this.Margin = new System.Windows.Forms.Padding(4);
            this.Name = "ProduccionUserControl";
            this.Size = new System.Drawing.Size(1767, 850);
            this.pnlFormProduccion.ResumeLayout(false);
            this.pnlFormProduccion.PerformLayout();
            this.pnlProduccionDia.ResumeLayout(false);
            this.pnlProduccionDia.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvProduccion)).EndInit();
            this.pnlMainContainer.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlFormProduccion;
        private System.Windows.Forms.Label lblError;
        private System.Windows.Forms.Button btnCancelar;
        private System.Windows.Forms.Button btnGuardar;
        private System.Windows.Forms.TextBox txtCantidad;
        private System.Windows.Forms.Label lblCantidad;
        private System.Windows.Forms.DateTimePicker dtpFecha;
        private System.Windows.Forms.Label lblFecha;
        private System.Windows.Forms.ComboBox cboGalpon;
        private System.Windows.Forms.Label lblGalpon;
        private System.Windows.Forms.Label lblRegistroTitle;
        private System.Windows.Forms.Panel pnlProduccionDia;
        private System.Windows.Forms.Label lblTotal;
        private System.Windows.Forms.DataGridView dgvProduccion;
        private System.Windows.Forms.Label lblProduccionDiaTitle;
        private System.Windows.Forms.Panel pnlMainContainer;
    }
}
