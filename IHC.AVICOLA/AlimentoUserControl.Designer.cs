
namespace IHC.AVICOLA
{
    partial class AlimentoUserControl
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
            this.pnlMainContainer = new System.Windows.Forms.Panel();
            this.pnlMovimientos = new System.Windows.Forms.Panel();
            this.dgvMovimientos = new System.Windows.Forms.DataGridView();
            this.lblMovimientosTitle = new System.Windows.Forms.Label();
            this.pnlBotones = new System.Windows.Forms.Panel();
            this.btnIngreso = new System.Windows.Forms.Button();
            this.btnConsumo = new System.Windows.Forms.Button();
            this.pnlInsumos = new System.Windows.Forms.Panel();
            this.pnlSacos50kg = new System.Windows.Forms.Panel();
            this.lblSacos50kgTitle = new System.Windows.Forms.Label();
            this.pnlSacos25kg = new System.Windows.Forms.Panel();
            this.lblSacos25kgTitle = new System.Windows.Forms.Label();
            this.pnlAceite = new System.Windows.Forms.Panel();
            this.lblAceiteTitle = new System.Windows.Forms.Label();
            this.pnlMainContainer.SuspendLayout();
            this.pnlMovimientos.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvMovimientos)).BeginInit();
            this.pnlBotones.SuspendLayout();
            this.pnlInsumos.SuspendLayout();
            this.pnlSacos50kg.SuspendLayout();
            this.pnlSacos25kg.SuspendLayout();
            this.pnlAceite.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlMainContainer
            // 
            this.pnlMainContainer.AutoScroll = true;
            this.pnlMainContainer.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.pnlMainContainer.Controls.Add(this.pnlMovimientos);
            this.pnlMainContainer.Controls.Add(this.pnlBotones);
            this.pnlMainContainer.Controls.Add(this.pnlInsumos);
            this.pnlMainContainer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMainContainer.Location = new System.Drawing.Point(0, 0);
            this.pnlMainContainer.Margin = new System.Windows.Forms.Padding(4);
            this.pnlMainContainer.Name = "pnlMainContainer";
            this.pnlMainContainer.Padding = new System.Windows.Forms.Padding(20);
            this.pnlMainContainer.Size = new System.Drawing.Size(1767, 980);
            this.pnlMainContainer.TabIndex = 0;
            // 
            // pnlMovimientos
            // 
            this.pnlMovimientos.BackColor = System.Drawing.Color.White;
            this.pnlMovimientos.Controls.Add(this.dgvMovimientos);
            this.pnlMovimientos.Controls.Add(this.lblMovimientosTitle);
            this.pnlMovimientos.Location = new System.Drawing.Point(20, 970);
            this.pnlMovimientos.Margin = new System.Windows.Forms.Padding(4);
            this.pnlMovimientos.MinimumSize = new System.Drawing.Size(800, 300);
            this.pnlMovimientos.Name = "pnlMovimientos";
            this.pnlMovimientos.Padding = new System.Windows.Forms.Padding(25);
            this.pnlMovimientos.Size = new System.Drawing.Size(1727, 300);
            this.pnlMovimientos.TabIndex = 2;
            // 
            // dgvMovimientos
            // 
            this.dgvMovimientos.AllowUserToAddRows = false;
            this.dgvMovimientos.AllowUserToDeleteRows = false;
            this.dgvMovimientos.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvMovimientos.BackgroundColor = System.Drawing.Color.White;
            this.dgvMovimientos.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvMovimientos.Location = new System.Drawing.Point(25, 75);
            this.dgvMovimientos.Margin = new System.Windows.Forms.Padding(4);
            this.dgvMovimientos.Name = "dgvMovimientos";
            this.dgvMovimientos.ReadOnly = true;
            this.dgvMovimientos.RowHeadersWidth = 51;
            this.dgvMovimientos.Size = new System.Drawing.Size(1677, 200);
            this.dgvMovimientos.TabIndex = 1;
            this.dgvMovimientos.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            // 
            // lblMovimientosTitle
            // 
            this.lblMovimientosTitle.AutoSize = true;
            this.lblMovimientosTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblMovimientosTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblMovimientosTitle.Location = new System.Drawing.Point(25, 25);
            this.lblMovimientosTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblMovimientosTitle.Name = "lblMovimientosTitle";
            this.lblMovimientosTitle.Size = new System.Drawing.Size(297, 41);
            this.lblMovimientosTitle.TabIndex = 0;
            this.lblMovimientosTitle.Text = "Historial de Movimientos";
            // 
            // pnlBotones
            // 
            this.pnlBotones.BackColor = System.Drawing.Color.White;
            this.pnlBotones.Controls.Add(this.btnIngreso);
            this.pnlBotones.Controls.Add(this.btnConsumo);
            this.pnlBotones.Location = new System.Drawing.Point(20, 860);
            this.pnlBotones.Margin = new System.Windows.Forms.Padding(4);
            this.pnlBotones.MinimumSize = new System.Drawing.Size(800, 110);
            this.pnlBotones.Name = "pnlBotones";
            this.pnlBotones.Padding = new System.Windows.Forms.Padding(25);
            this.pnlBotones.Size = new System.Drawing.Size(1727, 110);
            this.pnlBotones.TabIndex = 1;
            // 
            // btnIngreso
            // 
            this.btnIngreso.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(34)))), ((int)(((byte)(197)))), ((int)(((byte)(94)))));
            this.btnIngreso.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnIngreso.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnIngreso.ForeColor = System.Drawing.Color.White;
            this.btnIngreso.Location = new System.Drawing.Point(25, 25);
            this.btnIngreso.Margin = new System.Windows.Forms.Padding(4);
            this.btnIngreso.Name = "btnIngreso";
            this.btnIngreso.Size = new System.Drawing.Size(200, 60);
            this.btnIngreso.TabIndex = 0;
            this.btnIngreso.Text = "Registrar Ingreso";
            this.btnIngreso.UseVisualStyleBackColor = false;
            // 
            // btnConsumo
            // 
            this.btnConsumo.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(249)))), ((int)(((byte)(115)))), ((int)(((byte)(22)))));
            this.btnConsumo.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnConsumo.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnConsumo.ForeColor = System.Drawing.Color.White;
            this.btnConsumo.Location = new System.Drawing.Point(250, 25);
            this.btnConsumo.Margin = new System.Windows.Forms.Padding(4);
            this.btnConsumo.Name = "btnConsumo";
            this.btnConsumo.Size = new System.Drawing.Size(200, 60);
            this.btnConsumo.TabIndex = 1;
            this.btnConsumo.Text = "Registrar Consumo";
            this.btnConsumo.UseVisualStyleBackColor = false;
            // 
            // pnlInsumos
            // 
            this.pnlInsumos.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.pnlInsumos.Controls.Add(this.pnlSacos50kg);
            this.pnlInsumos.Controls.Add(this.pnlSacos25kg);
            this.pnlInsumos.Controls.Add(this.pnlAceite);
            this.pnlInsumos.Location = new System.Drawing.Point(20, 20);
            this.pnlInsumos.Margin = new System.Windows.Forms.Padding(4);
            this.pnlInsumos.Name = "pnlInsumos";
            this.pnlInsumos.Padding = new System.Windows.Forms.Padding(25);
            this.pnlInsumos.Size = new System.Drawing.Size(1727, 840);
            this.pnlInsumos.TabIndex = 0;
            this.pnlInsumos.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlInsumos.MinimumSize = new System.Drawing.Size(1200, 840);
            // 
            // pnlSacos50kg
            // 
            this.pnlSacos50kg.AutoScroll = true;
            this.pnlSacos50kg.BackColor = System.Drawing.Color.White;
            this.pnlSacos50kg.Controls.Add(this.lblSacos50kgTitle);
            this.pnlSacos50kg.Location = new System.Drawing.Point(25, 25);
            this.pnlSacos50kg.Margin = new System.Windows.Forms.Padding(4);
            this.pnlSacos50kg.MinimumSize = new System.Drawing.Size(350, 790);
            this.pnlSacos50kg.Name = "pnlSacos50kg";
            this.pnlSacos50kg.Padding = new System.Windows.Forms.Padding(25);
            this.pnlSacos50kg.Size = new System.Drawing.Size(520, 790);
            this.pnlSacos50kg.TabIndex = 0;
            // 
            // lblSacos50kgTitle
            // 
            this.lblSacos50kgTitle.AutoSize = true;
            this.lblSacos50kgTitle.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblSacos50kgTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(99)))), ((int)(((byte)(235)))));
            this.lblSacos50kgTitle.Location = new System.Drawing.Point(25, 25);
            this.lblSacos50kgTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblSacos50kgTitle.Name = "lblSacos50kgTitle";
            this.lblSacos50kgTitle.Size = new System.Drawing.Size(255, 37);
            this.lblSacos50kgTitle.TabIndex = 0;
            this.lblSacos50kgTitle.Text = "Sacos de 50kg";
            // 
            // pnlSacos25kg
            // 
            this.pnlSacos25kg.AutoScroll = true;
            this.pnlSacos25kg.BackColor = System.Drawing.Color.White;
            this.pnlSacos25kg.Controls.Add(this.lblSacos25kgTitle);
            this.pnlSacos25kg.Location = new System.Drawing.Point(570, 25);
            this.pnlSacos25kg.Margin = new System.Windows.Forms.Padding(4);
            this.pnlSacos25kg.MinimumSize = new System.Drawing.Size(350, 790);
            this.pnlSacos25kg.Name = "pnlSacos25kg";
            this.pnlSacos25kg.Padding = new System.Windows.Forms.Padding(25);
            this.pnlSacos25kg.Size = new System.Drawing.Size(520, 790);
            this.pnlSacos25kg.TabIndex = 1;
            // 
            // lblSacos25kgTitle
            // 
            this.lblSacos25kgTitle.AutoSize = true;
            this.lblSacos25kgTitle.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblSacos25kgTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(147)))), ((int)(((byte)(51)))), ((int)(((byte)(234)))));
            this.lblSacos25kgTitle.Location = new System.Drawing.Point(25, 25);
            this.lblSacos25kgTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblSacos25kgTitle.Name = "lblSacos25kgTitle";
            this.lblSacos25kgTitle.Size = new System.Drawing.Size(255, 37);
            this.lblSacos25kgTitle.TabIndex = 0;
            this.lblSacos25kgTitle.Text = "Sacos de 25kg";
            // 
            // pnlAceite
            // 
            this.pnlAceite.AutoScroll = true;
            this.pnlAceite.BackColor = System.Drawing.Color.White;
            this.pnlAceite.Controls.Add(this.lblAceiteTitle);
            this.pnlAceite.Location = new System.Drawing.Point(1115, 25);
            this.pnlAceite.Margin = new System.Windows.Forms.Padding(4);
            this.pnlAceite.MinimumSize = new System.Drawing.Size(350, 790);
            this.pnlAceite.Name = "pnlAceite";
            this.pnlAceite.Padding = new System.Windows.Forms.Padding(25);
            this.pnlAceite.Size = new System.Drawing.Size(520, 790);
            this.pnlAceite.TabIndex = 2;
            // 
            // lblAceiteTitle
            // 
            this.lblAceiteTitle.AutoSize = true;
            this.lblAceiteTitle.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblAceiteTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(119)))), ((int)(((byte)(6)))));
            this.lblAceiteTitle.Location = new System.Drawing.Point(25, 25);
            this.lblAceiteTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblAceiteTitle.Name = "lblAceiteTitle";
            this.lblAceiteTitle.Size = new System.Drawing.Size(275, 37);
            this.lblAceiteTitle.TabIndex = 0;
            this.lblAceiteTitle.Text = "Aceite de Soya";
            // 
            // AlimentoUserControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.Controls.Add(this.pnlMainContainer);
            this.Margin = new System.Windows.Forms.Padding(4);
            this.Name = "AlimentoUserControl";
            this.Size = new System.Drawing.Size(1767, 980);
            this.pnlMainContainer.ResumeLayout(false);
            this.pnlMovimientos.ResumeLayout(false);
            this.pnlMovimientos.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvMovimientos)).EndInit();
            this.pnlBotones.ResumeLayout(false);
            this.pnlInsumos.ResumeLayout(false);
            this.pnlSacos50kg.ResumeLayout(false);
            this.pnlSacos50kg.PerformLayout();
            this.pnlSacos25kg.ResumeLayout(false);
            this.pnlSacos25kg.PerformLayout();
            this.pnlAceite.ResumeLayout(false);
            this.pnlAceite.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlMainContainer;
        private System.Windows.Forms.Panel pnlMovimientos;
        private System.Windows.Forms.DataGridView dgvMovimientos;
        private System.Windows.Forms.Label lblMovimientosTitle;
        private System.Windows.Forms.Panel pnlBotones;
        private System.Windows.Forms.Button btnIngreso;
        private System.Windows.Forms.Button btnConsumo;
        private System.Windows.Forms.Panel pnlInsumos;
        private System.Windows.Forms.Panel pnlSacos50kg;
        private System.Windows.Forms.Label lblSacos50kgTitle;
        private System.Windows.Forms.Panel pnlSacos25kg;
        private System.Windows.Forms.Label lblSacos25kgTitle;
        private System.Windows.Forms.Panel pnlAceite;
        private System.Windows.Forms.Label lblAceiteTitle;
    }
}
