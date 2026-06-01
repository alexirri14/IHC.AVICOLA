namespace IHC.AVICOLA
{
    partial class VentasUserControl
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
            this.pnlMain = new System.Windows.Forms.Panel();
            this.pnlHistorial = new System.Windows.Forms.Panel();
            this.pnlTotalVentas = new System.Windows.Forms.Panel();
            this.lblTotalVentas = new System.Windows.Forms.Label();
            this.lblTotalVentasLabel = new System.Windows.Forms.Label();
            this.pnlTotalIcono = new System.Windows.Forms.Panel();
            this.dgvHistorial = new System.Windows.Forms.DataGridView();
            this.lblHistorialTitle = new System.Windows.Forms.Label();
            this.pnlRegistro = new System.Windows.Forms.Panel();
            this.lblTotal = new System.Windows.Forms.Label();
            this.pnlTotal = new System.Windows.Forms.Panel();
            this.btnRegistrar = new System.Windows.Forms.Button();
            this.txtPrecioUnitario = new System.Windows.Forms.TextBox();
            this.lblPrecioUnitario = new System.Windows.Forms.Label();
            this.txtCantidad = new System.Windows.Forms.TextBox();
            this.lblCantidad = new System.Windows.Forms.Label();
            this.txtCliente = new System.Windows.Forms.TextBox();
            this.lblCliente = new System.Windows.Forms.Label();
            this.lblRegistroTitle = new System.Windows.Forms.Label();
            this.pnlMain.SuspendLayout();
            this.pnlHistorial.SuspendLayout();
            this.pnlTotalVentas.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvHistorial)).BeginInit();
            this.pnlRegistro.SuspendLayout();
            this.pnlTotal.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlMain
            // 
            this.pnlMain.AutoScroll = true;
            this.pnlMain.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.pnlMain.Controls.Add(this.pnlHistorial);
            this.pnlMain.Controls.Add(this.pnlRegistro);
            this.pnlMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMain.Location = new System.Drawing.Point(0, 0);
            this.pnlMain.Margin = new System.Windows.Forms.Padding(4);
            this.pnlMain.Name = "pnlMain";
            this.pnlMain.Padding = new System.Windows.Forms.Padding(20);
            this.pnlMain.Size = new System.Drawing.Size(1767, 960);
            this.pnlMain.TabIndex = 0;
            // 
            // pnlHistorial
            // 
            this.pnlHistorial.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlHistorial.BackColor = System.Drawing.Color.White;
            this.pnlHistorial.Controls.Add(this.pnlTotalVentas);
            this.pnlHistorial.Controls.Add(this.dgvHistorial);
            this.pnlHistorial.Controls.Add(this.lblHistorialTitle);
            this.pnlHistorial.Location = new System.Drawing.Point(20, 400);
            this.pnlHistorial.Name = "pnlHistorial";
            this.pnlHistorial.Padding = new System.Windows.Forms.Padding(25);
            this.pnlHistorial.Size = new System.Drawing.Size(1727, 520);
            this.pnlHistorial.TabIndex = 1;
            // 
            // pnlTotalVentas
            // 
            this.pnlTotalVentas.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlTotalVentas.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(200)))), ((int)(((byte)(80)))));
            this.pnlTotalVentas.Controls.Add(this.lblTotalVentas);
            this.pnlTotalVentas.Controls.Add(this.lblTotalVentasLabel);
            this.pnlTotalVentas.Controls.Add(this.pnlTotalIcono);
            this.pnlTotalVentas.Location = new System.Drawing.Point(25, 425);
            this.pnlTotalVentas.Name = "pnlTotalVentas";
            this.pnlTotalVentas.Padding = new System.Windows.Forms.Padding(15);
            this.pnlTotalVentas.Size = new System.Drawing.Size(1677, 70);
            this.pnlTotalVentas.TabIndex = 2;
            // 
            // lblTotalVentas
            // 
            this.lblTotalVentas.AutoSize = true;
            this.lblTotalVentas.Font = new System.Drawing.Font("Segoe UI", 24F, System.Drawing.FontStyle.Bold);
            this.lblTotalVentas.ForeColor = System.Drawing.Color.White;
            this.lblTotalVentas.Location = new System.Drawing.Point(307, 15);
            this.lblTotalVentas.Name = "lblTotalVentas";
            this.lblTotalVentas.Size = new System.Drawing.Size(154, 54);
            this.lblTotalVentas.TabIndex = 2;
            this.lblTotalVentas.Text = "S/ 0.00";
            // 
            // lblTotalVentasLabel
            // 
            this.lblTotalVentasLabel.AutoSize = true;
            this.lblTotalVentasLabel.Font = new System.Drawing.Font("Segoe UI", 13.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblTotalVentasLabel.ForeColor = System.Drawing.Color.White;
            this.lblTotalVentasLabel.Location = new System.Drawing.Point(114, 24);
            this.lblTotalVentasLabel.Name = "lblTotalVentasLabel";
            this.lblTotalVentasLabel.Size = new System.Drawing.Size(167, 31);
            this.lblTotalVentasLabel.TabIndex = 1;
            this.lblTotalVentasLabel.Text = "Total de ventas";
            // 
            // pnlTotalIcono
            // 
            this.pnlTotalIcono.Location = new System.Drawing.Point(15, 15);
            this.pnlTotalIcono.Name = "pnlTotalIcono";
            this.pnlTotalIcono.Size = new System.Drawing.Size(50, 40);
            this.pnlTotalIcono.TabIndex = 0;
            // 
            // dgvHistorial
            // 
            this.dgvHistorial.AllowUserToAddRows = false;
            this.dgvHistorial.AllowUserToDeleteRows = false;
            this.dgvHistorial.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvHistorial.BackgroundColor = System.Drawing.Color.White;
            this.dgvHistorial.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvHistorial.Location = new System.Drawing.Point(25, 75);
            this.dgvHistorial.Name = "dgvHistorial";
            this.dgvHistorial.ReadOnly = true;
            this.dgvHistorial.RowHeadersWidth = 51;
            this.dgvHistorial.Size = new System.Drawing.Size(1677, 340);
            this.dgvHistorial.TabIndex = 1;
            // 
            // lblHistorialTitle
            // 
            this.lblHistorialTitle.AutoSize = true;
            this.lblHistorialTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold);
            this.lblHistorialTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblHistorialTitle.Location = new System.Drawing.Point(25, 20);
            this.lblHistorialTitle.Name = "lblHistorialTitle";
            this.lblHistorialTitle.Size = new System.Drawing.Size(281, 41);
            this.lblHistorialTitle.TabIndex = 0;
            this.lblHistorialTitle.Text = "Historial de ventas";
            // 
            // pnlRegistro
            // 
            this.pnlRegistro.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlRegistro.BackColor = System.Drawing.Color.White;
            this.pnlRegistro.Controls.Add(this.pnlTotal);
            this.pnlRegistro.Controls.Add(this.btnRegistrar);
            this.pnlRegistro.Controls.Add(this.txtPrecioUnitario);
            this.pnlRegistro.Controls.Add(this.lblPrecioUnitario);
            this.pnlRegistro.Controls.Add(this.txtCantidad);
            this.pnlRegistro.Controls.Add(this.lblCantidad);
            this.pnlRegistro.Controls.Add(this.txtCliente);
            this.pnlRegistro.Controls.Add(this.lblCliente);
            this.pnlRegistro.Controls.Add(this.lblRegistroTitle);
            this.pnlRegistro.Location = new System.Drawing.Point(20, 20);
            this.pnlRegistro.Name = "pnlRegistro";
            this.pnlRegistro.Padding = new System.Windows.Forms.Padding(25);
            this.pnlRegistro.Size = new System.Drawing.Size(1727, 350);
            this.pnlRegistro.TabIndex = 0;
            // 
            // lblTotal
            // 
            this.lblTotal.AutoSize = true;
            this.lblTotal.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold);
            this.lblTotal.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(100)))), ((int)(((byte)(0)))));
            this.lblTotal.Location = new System.Drawing.Point(25, 180);
            this.lblTotal.Name = "lblTotal";
            this.lblTotal.Size = new System.Drawing.Size(201, 41);
            this.lblTotal.TabIndex = 8;
            this.lblTotal.Text = "Total: S/ 0.00";
            // 
            // pnlTotal
            // 
            this.pnlTotal.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlTotal.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(230)))), ((int)(((byte)(250)))), ((int)(((byte)(230)))));
            this.pnlTotal.Controls.Add(this.lblTotal);
            this.pnlTotal.Location = new System.Drawing.Point(25, 165);
            this.pnlTotal.Name = "pnlTotal";
            this.pnlTotal.Padding = new System.Windows.Forms.Padding(15);
            this.pnlTotal.Size = new System.Drawing.Size(1677, 60);
            this.pnlTotal.TabIndex = 7;
            // 
            // btnRegistrar
            // 
            this.btnRegistrar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(150)))), ((int)(((byte)(0)))));
            this.btnRegistrar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnRegistrar.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold);
            this.btnRegistrar.ForeColor = System.Drawing.Color.White;
            this.btnRegistrar.Location = new System.Drawing.Point(25, 245);
            this.btnRegistrar.Name = "btnRegistrar";
            this.btnRegistrar.Size = new System.Drawing.Size(200, 50);
            this.btnRegistrar.TabIndex = 6;
            this.btnRegistrar.Text = "Registrar venta";
            this.btnRegistrar.UseVisualStyleBackColor = false;
            // 
            // txtPrecioUnitario
            // 
            this.txtPrecioUnitario.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.txtPrecioUnitario.Location = new System.Drawing.Point(1100, 100);
            this.txtPrecioUnitario.Name = "txtPrecioUnitario";
            this.txtPrecioUnitario.Size = new System.Drawing.Size(400, 30);
            this.txtPrecioUnitario.TabIndex = 5;
            // 
            // lblPrecioUnitario
            // 
            this.lblPrecioUnitario.AutoSize = true;
            this.lblPrecioUnitario.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.lblPrecioUnitario.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblPrecioUnitario.Location = new System.Drawing.Point(1100, 70);
            this.lblPrecioUnitario.Name = "lblPrecioUnitario";
            this.lblPrecioUnitario.Size = new System.Drawing.Size(152, 23);
            this.lblPrecioUnitario.TabIndex = 4;
            this.lblPrecioUnitario.Text = "Precio unitario (S/)";
            // 
            // txtCantidad
            // 
            this.txtCantidad.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.txtCantidad.Location = new System.Drawing.Point(550, 100);
            this.txtCantidad.Name = "txtCantidad";
            this.txtCantidad.Size = new System.Drawing.Size(400, 30);
            this.txtCantidad.TabIndex = 3;
            // 
            // lblCantidad
            // 
            this.lblCantidad.AutoSize = true;
            this.lblCantidad.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.lblCantidad.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblCantidad.Location = new System.Drawing.Point(550, 70);
            this.lblCantidad.Name = "lblCantidad";
            this.lblCantidad.Size = new System.Drawing.Size(148, 23);
            this.lblCantidad.TabIndex = 2;
            this.lblCantidad.Text = "Cantidad (huevos)";
            // 
            // txtCliente
            // 
            this.txtCliente.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.txtCliente.Location = new System.Drawing.Point(25, 100);
            this.txtCliente.Name = "txtCliente";
            this.txtCliente.Size = new System.Drawing.Size(400, 30);
            this.txtCliente.TabIndex = 1;
            // 
            // lblCliente
            // 
            this.lblCliente.AutoSize = true;
            this.lblCliente.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.lblCliente.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblCliente.Location = new System.Drawing.Point(25, 70);
            this.lblCliente.Name = "lblCliente";
            this.lblCliente.Size = new System.Drawing.Size(63, 23);
            this.lblCliente.TabIndex = 0;
            this.lblCliente.Text = "Cliente";
            // 
            // lblRegistroTitle
            // 
            this.lblRegistroTitle.AutoSize = true;
            this.lblRegistroTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold);
            this.lblRegistroTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblRegistroTitle.Location = new System.Drawing.Point(25, 20);
            this.lblRegistroTitle.Name = "lblRegistroTitle";
            this.lblRegistroTitle.Size = new System.Drawing.Size(280, 41);
            this.lblRegistroTitle.TabIndex = 0;
            this.lblRegistroTitle.Text = "Registro de Ventas";
            // 
            // VentasUserControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.Controls.Add(this.pnlMain);
            this.Margin = new System.Windows.Forms.Padding(4);
            this.Name = "VentasUserControl";
            this.Size = new System.Drawing.Size(1767, 960);
            this.pnlMain.ResumeLayout(false);
            this.pnlHistorial.ResumeLayout(false);
            this.pnlHistorial.PerformLayout();
            this.pnlTotalVentas.ResumeLayout(false);
            this.pnlTotalVentas.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvHistorial)).EndInit();
            this.pnlRegistro.ResumeLayout(false);
            this.pnlRegistro.PerformLayout();
            this.pnlTotal.ResumeLayout(false);
            this.pnlTotal.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlMain;
        private System.Windows.Forms.Panel pnlRegistro;
        private System.Windows.Forms.TextBox txtCantidad;
        private System.Windows.Forms.Label lblCantidad;
        private System.Windows.Forms.TextBox txtCliente;
        private System.Windows.Forms.Label lblCliente;
        private System.Windows.Forms.Label lblRegistroTitle;
        private System.Windows.Forms.Panel pnlHistorial;
        private System.Windows.Forms.DataGridView dgvHistorial;
        private System.Windows.Forms.Label lblHistorialTitle;
        private System.Windows.Forms.Button btnRegistrar;
        private System.Windows.Forms.TextBox txtPrecioUnitario;
        private System.Windows.Forms.Label lblPrecioUnitario;
        private System.Windows.Forms.Panel pnlTotal;
        private System.Windows.Forms.Label lblTotal;
        private System.Windows.Forms.Panel pnlTotalVentas;
        private System.Windows.Forms.Label lblTotalVentas;
        private System.Windows.Forms.Label lblTotalVentasLabel;
        private System.Windows.Forms.Panel pnlTotalIcono;
    }
}