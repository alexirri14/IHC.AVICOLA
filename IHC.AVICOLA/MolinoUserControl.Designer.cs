
namespace IHC.AVICOLA
{
    partial class MolinoUserControl
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

        #region Component Designer generated code

        private void InitializeComponent()
        {
            this.pnlMainContainer = new System.Windows.Forms.Panel();
            this.pnlTitulo = new System.Windows.Forms.Panel();
            this.lblTitulo = new System.Windows.Forms.Label();
            this.pnlForm = new System.Windows.Forms.Panel();
            this.lblError = new System.Windows.Forms.Label();
            this.btnCancelar = new System.Windows.Forms.Button();
            this.btnGuardar = new System.Windows.Forms.Button();
            this.btnCargarFormula = new System.Windows.Forms.Button();
            this.txtCantidadProduccion = new System.Windows.Forms.TextBox();
            this.lblCantidadProduccion = new System.Windows.Forms.Label();
            this.cboGalpon = new System.Windows.Forms.ComboBox();
            this.lblGalpon = new System.Windows.Forms.Label();
            this.lblFormTitle = new System.Windows.Forms.Label();
            this.pnlFormDetalles = new System.Windows.Forms.Panel();
            this.lblTotalFormula = new System.Windows.Forms.Label();
            this.flpIngredientes = new System.Windows.Forms.FlowLayoutPanel();
            this.lblDetallesTitle = new System.Windows.Forms.Label();
            this.pnlHistorial = new System.Windows.Forms.Panel();
            this.dgvHistorial = new System.Windows.Forms.DataGridView();
            this.lblHistorialTitle = new System.Windows.Forms.Label();
            this.pnlMainContainer.SuspendLayout();
            this.pnlTitulo.SuspendLayout();
            this.pnlForm.SuspendLayout();
            this.pnlFormDetalles.SuspendLayout();
            this.pnlHistorial.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvHistorial)).BeginInit();
            this.SuspendLayout();
            // 
            // pnlMainContainer
            // 
            this.pnlMainContainer.AutoScroll = true;
            this.pnlMainContainer.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.pnlMainContainer.Controls.Add(this.pnlHistorial);
            this.pnlMainContainer.Controls.Add(this.pnlFormDetalles);
            this.pnlMainContainer.Controls.Add(this.pnlForm);
            this.pnlMainContainer.Controls.Add(this.pnlTitulo);
            this.pnlMainContainer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMainContainer.Location = new System.Drawing.Point(0, 0);
            this.pnlMainContainer.Name = "pnlMainContainer";
            this.pnlMainContainer.Padding = new System.Windows.Forms.Padding(20);
            this.pnlMainContainer.Size = new System.Drawing.Size(1800, 1400);
            this.pnlMainContainer.TabIndex = 0;
            // 
            // pnlTitulo
            // 
            this.pnlTitulo.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlTitulo.BackColor = System.Drawing.Color.Teal;
            this.pnlTitulo.Controls.Add(this.lblTitulo);
            this.pnlTitulo.Location = new System.Drawing.Point(20, 20);
            this.pnlTitulo.Name = "pnlTitulo";
            this.pnlTitulo.Padding = new System.Windows.Forms.Padding(25);
            this.pnlTitulo.Size = new System.Drawing.Size(1760, 150);
            this.pnlTitulo.TabIndex = 0;
            // 
            // lblTitulo
            // 
            this.lblTitulo.AutoSize = true;
            this.lblTitulo.Font = new System.Drawing.Font("Segoe UI", 24F, System.Drawing.FontStyle.Bold);
            this.lblTitulo.ForeColor = System.Drawing.Color.White;
            this.lblTitulo.Location = new System.Drawing.Point(25, 35);
            this.lblTitulo.Name = "lblTitulo";
            this.lblTitulo.Size = new System.Drawing.Size(572, 54);
            this.lblTitulo.TabIndex = 0;
            this.lblTitulo.Text = "Produccion de Alimento - Molino";
            // 
            // pnlForm
            // 
            this.pnlForm.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlForm.BackColor = System.Drawing.Color.White;
            this.pnlForm.Controls.Add(this.lblError);
            this.pnlForm.Controls.Add(this.btnCancelar);
            this.pnlForm.Controls.Add(this.btnGuardar);
            this.pnlForm.Controls.Add(this.btnCargarFormula);
            this.pnlForm.Controls.Add(this.txtCantidadProduccion);
            this.pnlForm.Controls.Add(this.lblCantidadProduccion);
            this.pnlForm.Controls.Add(this.cboGalpon);
            this.pnlForm.Controls.Add(this.lblGalpon);
            this.pnlForm.Controls.Add(this.lblFormTitle);
            this.pnlForm.Location = new System.Drawing.Point(20, 190);
            this.pnlForm.Name = "pnlForm";
            this.pnlForm.Padding = new System.Windows.Forms.Padding(25);
            this.pnlForm.Size = new System.Drawing.Size(1760, 280);
            this.pnlForm.TabIndex = 1;
            // 
            // lblError
            // 
            this.lblError.AutoSize = true;
            this.lblError.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.lblError.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(220)))), ((int)(((byte)(53)))), ((int)(((byte)(69)))));
            this.lblError.Location = new System.Drawing.Point(25, 200);
            this.lblError.Name = "lblError";
            this.lblError.Size = new System.Drawing.Size(366, 20);
            this.lblError.TabIndex = 9;
            this.lblError.Text = "Por favor complete todos los campos obligatorios";
            this.lblError.Visible = false;
            // 
            // btnCancelar
            // 
            this.btnCancelar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnCancelar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(108)))), ((int)(((byte)(117)))), ((int)(((byte)(125)))));
            this.btnCancelar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCancelar.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold);
            this.btnCancelar.ForeColor = System.Drawing.Color.White;
            this.btnCancelar.Location = new System.Drawing.Point(1480, 200);
            this.btnCancelar.Name = "btnCancelar";
            this.btnCancelar.Size = new System.Drawing.Size(200, 50);
            this.btnCancelar.TabIndex = 8;
            this.btnCancelar.Text = "Cancelar";
            this.btnCancelar.UseVisualStyleBackColor = false;
            // 
            // btnGuardar
            // 
            this.btnGuardar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnGuardar.BackColor = System.Drawing.Color.Teal;
            this.btnGuardar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnGuardar.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold);
            this.btnGuardar.ForeColor = System.Drawing.Color.White;
            this.btnGuardar.Location = new System.Drawing.Point(1270, 200);
            this.btnGuardar.Name = "btnGuardar";
            this.btnGuardar.Size = new System.Drawing.Size(200, 50);
            this.btnGuardar.TabIndex = 7;
            this.btnGuardar.Text = "Producir";
            this.btnGuardar.UseVisualStyleBackColor = false;
            // 
            // btnCargarFormula
            // 
            this.btnCargarFormula.BackColor = System.Drawing.Color.Teal;
            this.btnCargarFormula.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCargarFormula.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold);
            this.btnCargarFormula.ForeColor = System.Drawing.Color.White;
            this.btnCargarFormula.Location = new System.Drawing.Point(25, 150);
            this.btnCargarFormula.Name = "btnCargarFormula";
            this.btnCargarFormula.Size = new System.Drawing.Size(400, 45);
            this.btnCargarFormula.TabIndex = 6;
            this.btnCargarFormula.Text = "Cargar Formula";
            this.btnCargarFormula.UseVisualStyleBackColor = false;
            // 
            // txtCantidadProduccion
            // 
            this.txtCantidadProduccion.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.txtCantidadProduccion.Location = new System.Drawing.Point(470, 95);
            this.txtCantidadProduccion.Name = "txtCantidadProduccion";
            this.txtCantidadProduccion.Size = new System.Drawing.Size(350, 30);
            this.txtCantidadProduccion.TabIndex = 5;
            // 
            // lblCantidadProduccion
            // 
            this.lblCantidadProduccion.AutoSize = true;
            this.lblCantidadProduccion.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.lblCantidadProduccion.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblCantidadProduccion.Location = new System.Drawing.Point(470, 65);
            this.lblCantidadProduccion.Name = "lblCantidadProduccion";
            this.lblCantidadProduccion.Size = new System.Drawing.Size(202, 23);
            this.lblCantidadProduccion.TabIndex = 4;
            this.lblCantidadProduccion.Text = "Cantidad a Producir (kg)*";
            // 
            // cboGalpon
            // 
            this.cboGalpon.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cboGalpon.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.cboGalpon.FormattingEnabled = true;
            this.cboGalpon.Location = new System.Drawing.Point(25, 95);
            this.cboGalpon.Name = "cboGalpon";
            this.cboGalpon.Size = new System.Drawing.Size(400, 31);
            this.cboGalpon.TabIndex = 3;
            // 
            // lblGalpon
            // 
            this.lblGalpon.AutoSize = true;
            this.lblGalpon.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.lblGalpon.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblGalpon.Location = new System.Drawing.Point(25, 65);
            this.lblGalpon.Name = "lblGalpon";
            this.lblGalpon.Size = new System.Drawing.Size(134, 23);
            this.lblGalpon.TabIndex = 2;
            this.lblGalpon.Text = "Tipo de Galpon*";
            // 
            // lblFormTitle
            // 
            this.lblFormTitle.AutoSize = true;
            this.lblFormTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold);
            this.lblFormTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblFormTitle.Location = new System.Drawing.Point(25, 20);
            this.lblFormTitle.Name = "lblFormTitle";
            this.lblFormTitle.Size = new System.Drawing.Size(324, 41);
            this.lblFormTitle.TabIndex = 0;
            this.lblFormTitle.Text = "Nueva Produccion";
            // 
            // pnlFormDetalles
            // 
            this.pnlFormDetalles.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlFormDetalles.BackColor = System.Drawing.Color.White;
            this.pnlFormDetalles.Controls.Add(this.lblTotalFormula);
            this.pnlFormDetalles.Controls.Add(this.flpIngredientes);
            this.pnlFormDetalles.Controls.Add(this.lblDetallesTitle);
            this.pnlFormDetalles.Location = new System.Drawing.Point(20, 490);
            this.pnlFormDetalles.Name = "pnlFormDetalles";
            this.pnlFormDetalles.Padding = new System.Windows.Forms.Padding(25);
            this.pnlFormDetalles.Size = new System.Drawing.Size(1760, 400);
            this.pnlFormDetalles.TabIndex = 10;
            // 
            // lblTotalFormula
            // 
            this.lblTotalFormula.AutoSize = true;
            this.lblTotalFormula.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold);
            this.lblTotalFormula.ForeColor = System.Drawing.Color.Teal;
            this.lblTotalFormula.Location = new System.Drawing.Point(25, 340);
            this.lblTotalFormula.Name = "lblTotalFormula";
            this.lblTotalFormula.Size = new System.Drawing.Size(0, 28);
            this.lblTotalFormula.TabIndex = 2;
            // 
            // flpIngredientes
            // 
            this.flpIngredientes.AutoScroll = true;
            this.flpIngredientes.BackColor = System.Drawing.Color.White;
            this.flpIngredientes.Location = new System.Drawing.Point(25, 75);
            this.flpIngredientes.Name = "flpIngredientes";
            this.flpIngredientes.Padding = new System.Windows.Forms.Padding(5);
            this.flpIngredientes.Size = new System.Drawing.Size(1700, 250);
            this.flpIngredientes.TabIndex = 1;
            // 
            // lblDetallesTitle
            // 
            this.lblDetallesTitle.AutoSize = true;
            this.lblDetallesTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold);
            this.lblDetallesTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblDetallesTitle.Location = new System.Drawing.Point(25, 20);
            this.lblDetallesTitle.Name = "lblDetallesTitle";
            this.lblDetallesTitle.Size = new System.Drawing.Size(348, 41);
            this.lblDetallesTitle.TabIndex = 0;
            this.lblDetallesTitle.Text = "Detalles de Formula";
            // 
            // pnlHistorial
            // 
            this.pnlHistorial.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pnlHistorial.BackColor = System.Drawing.Color.White;
            this.pnlHistorial.Controls.Add(this.dgvHistorial);
            this.pnlHistorial.Controls.Add(this.lblHistorialTitle);
            this.pnlHistorial.Location = new System.Drawing.Point(20, 910);
            this.pnlHistorial.Name = "pnlHistorial";
            this.pnlHistorial.Padding = new System.Windows.Forms.Padding(25);
            this.pnlHistorial.Size = new System.Drawing.Size(1760, 350);
            this.pnlHistorial.TabIndex = 11;
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
            this.dgvHistorial.Size = new System.Drawing.Size(1700, 250);
            this.dgvHistorial.TabIndex = 1;
            // 
            // lblHistorialTitle
            // 
            this.lblHistorialTitle.AutoSize = true;
            this.lblHistorialTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold);
            this.lblHistorialTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblHistorialTitle.Location = new System.Drawing.Point(25, 20);
            this.lblHistorialTitle.Name = "lblHistorialTitle";
            this.lblHistorialTitle.Size = new System.Drawing.Size(398, 41);
            this.lblHistorialTitle.TabIndex = 0;
            this.lblHistorialTitle.Text = "Historial de Produccion";
            // 
            // MolinoUserControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.Controls.Add(this.pnlMainContainer);
            this.Name = "MolinoUserControl";
            this.Size = new System.Drawing.Size(1800, 1400);
            this.pnlMainContainer.ResumeLayout(false);
            this.pnlTitulo.ResumeLayout(false);
            this.pnlTitulo.PerformLayout();
            this.pnlForm.ResumeLayout(false);
            this.pnlForm.PerformLayout();
            this.pnlFormDetalles.ResumeLayout(false);
            this.pnlFormDetalles.PerformLayout();
            this.pnlHistorial.ResumeLayout(false);
            this.pnlHistorial.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvHistorial)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlMainContainer;
        private System.Windows.Forms.Panel pnlTitulo;
        private System.Windows.Forms.Label lblTitulo;
        private System.Windows.Forms.Panel pnlForm;
        private System.Windows.Forms.Button btnCancelar;
        private System.Windows.Forms.Button btnGuardar;
        private System.Windows.Forms.ComboBox cboGalpon;
        private System.Windows.Forms.Label lblGalpon;
        private System.Windows.Forms.Label lblFormTitle;
        private System.Windows.Forms.Label lblError;
        private System.Windows.Forms.Button btnCargarFormula;
        private System.Windows.Forms.TextBox txtCantidadProduccion;
        private System.Windows.Forms.Label lblCantidadProduccion;
        private System.Windows.Forms.Panel pnlFormDetalles;
        private System.Windows.Forms.FlowLayoutPanel flpIngredientes;
        private System.Windows.Forms.Label lblDetallesTitle;
        private System.Windows.Forms.Label lblTotalFormula;
        private System.Windows.Forms.Panel pnlHistorial;
        private System.Windows.Forms.DataGridView dgvHistorial;
        private System.Windows.Forms.Label lblHistorialTitle;
    }
}
