namespace IHC.AVICOLA
{
    partial class DashboardUserControl
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

        #region Código generado por el Diseñador de Windows Forms

        private void InitializeComponent()
        {
            this.pnlResumen = new System.Windows.Forms.Panel();
            this.lblResumenTitle = new System.Windows.Forms.Label();
            this.pnlHuevos = new System.Windows.Forms.Panel();
            this.lblHuevosVal = new System.Windows.Forms.Label();
            this.lblHuevosTitle = new System.Windows.Forms.Label();
            this.pnlStock = new System.Windows.Forms.Panel();
            this.lblStockVal = new System.Windows.Forms.Label();
            this.lblStockTitle = new System.Windows.Forms.Label();
            this.pnlVentas = new System.Windows.Forms.Panel();
            this.lblVentasVal = new System.Windows.Forms.Label();
            this.lblVentasTitle = new System.Windows.Forms.Label();
            this.pnlAlimento = new System.Windows.Forms.Panel();
            this.lblAlimentoVal = new System.Windows.Forms.Label();
            this.lblAlimentoTitle = new System.Windows.Forms.Label();
            this.pnlAlertas = new System.Windows.Forms.Panel();
            this.lblAlertasTitle = new System.Windows.Forms.Label();
            this.lblAlerta1 = new System.Windows.Forms.Label();
            this.lblAlerta2 = new System.Windows.Forms.Label();
            this.pnlRendimiento = new System.Windows.Forms.Panel();
            this.lblRendimientoTitle = new System.Windows.Forms.Label();
            this.lblPromedioTitle = new System.Windows.Forms.Label();
            this.lblPromedio = new System.Windows.Forms.Label();
            this.lblConsumoTitle = new System.Windows.Forms.Label();
            this.lblConsumo = new System.Windows.Forms.Label();
            this.lblTasaTitle = new System.Windows.Forms.Label();
            this.lblTasa = new System.Windows.Forms.Label();
            this.pnlResumen.SuspendLayout();
            this.pnlHuevos.SuspendLayout();
            this.pnlStock.SuspendLayout();
            this.pnlVentas.SuspendLayout();
            this.pnlAlimento.SuspendLayout();
            this.pnlAlertas.SuspendLayout();
            this.pnlRendimiento.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlResumen
            // 
            this.pnlResumen.Controls.Add(this.lblResumenTitle);
            this.pnlResumen.Controls.Add(this.pnlHuevos);
            this.pnlResumen.Controls.Add(this.pnlStock);
            this.pnlResumen.Controls.Add(this.pnlVentas);
            this.pnlResumen.Controls.Add(this.pnlAlimento);
            this.pnlResumen.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlResumen.Location = new System.Drawing.Point(0, 0);
            this.pnlResumen.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlResumen.Name = "pnlResumen";
            this.pnlResumen.Size = new System.Drawing.Size(1787, 222);
            this.pnlResumen.TabIndex = 0;
            // 
            // lblResumenTitle
            // 
            this.lblResumenTitle.AutoSize = true;
            this.lblResumenTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblResumenTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(41)))), ((int)(((byte)(59)))));
            this.lblResumenTitle.Location = new System.Drawing.Point(0, 0);
            this.lblResumenTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblResumenTitle.Name = "lblResumenTitle";
            this.lblResumenTitle.Size = new System.Drawing.Size(353, 41);
            this.lblResumenTitle.TabIndex = 0;
            this.lblResumenTitle.Text = "📊 RESUMEN GENERAL";
            // 
            // pnlHuevos
            // 
            this.pnlHuevos.BackColor = System.Drawing.Color.White;
            this.pnlHuevos.Controls.Add(this.lblHuevosVal);
            this.pnlHuevos.Controls.Add(this.lblHuevosTitle);
            this.pnlHuevos.Location = new System.Drawing.Point(0, 62);
            this.pnlHuevos.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlHuevos.Name = "pnlHuevos";
            this.pnlHuevos.Size = new System.Drawing.Size(400, 148);
            this.pnlHuevos.TabIndex = 1;
            // 
            // lblHuevosVal
            // 
            this.lblHuevosVal.AutoSize = true;
            this.lblHuevosVal.Font = new System.Drawing.Font("Segoe UI", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblHuevosVal.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(41)))), ((int)(((byte)(59)))));
            this.lblHuevosVal.Location = new System.Drawing.Point(27, 68);
            this.lblHuevosVal.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblHuevosVal.Name = "lblHuevosVal";
            this.lblHuevosVal.Size = new System.Drawing.Size(182, 54);
            this.lblHuevosVal.TabIndex = 1;
            this.lblHuevosVal.Text = "1200 🥚";
            // 
            // lblHuevosTitle
            // 
            this.lblHuevosTitle.AutoSize = true;
            this.lblHuevosTitle.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblHuevosTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(100)))), ((int)(((byte)(116)))), ((int)(((byte)(139)))));
            this.lblHuevosTitle.Location = new System.Drawing.Point(27, 25);
            this.lblHuevosTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblHuevosTitle.Name = "lblHuevosTitle";
            this.lblHuevosTitle.Size = new System.Drawing.Size(99, 23);
            this.lblHuevosTitle.TabIndex = 0;
            this.lblHuevosTitle.Text = "Huevos hoy";
            // 
            // pnlStock
            // 
            this.pnlStock.BackColor = System.Drawing.Color.White;
            this.pnlStock.Controls.Add(this.lblStockVal);
            this.pnlStock.Controls.Add(this.lblStockTitle);
            this.pnlStock.Location = new System.Drawing.Point(427, 62);
            this.pnlStock.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlStock.Name = "pnlStock";
            this.pnlStock.Size = new System.Drawing.Size(400, 148);
            this.pnlStock.TabIndex = 2;
            // 
            // lblStockVal
            // 
            this.lblStockVal.AutoSize = true;
            this.lblStockVal.Font = new System.Drawing.Font("Segoe UI", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblStockVal.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(41)))), ((int)(((byte)(59)))));
            this.lblStockVal.Location = new System.Drawing.Point(27, 68);
            this.lblStockVal.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblStockVal.Name = "lblStockVal";
            this.lblStockVal.Size = new System.Drawing.Size(182, 54);
            this.lblStockVal.TabIndex = 1;
            this.lblStockVal.Text = "8500 📦";
            // 
            // lblStockTitle
            // 
            this.lblStockTitle.AutoSize = true;
            this.lblStockTitle.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblStockTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(100)))), ((int)(((byte)(116)))), ((int)(((byte)(139)))));
            this.lblStockTitle.Location = new System.Drawing.Point(27, 25);
            this.lblStockTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblStockTitle.Name = "lblStockTitle";
            this.lblStockTitle.Size = new System.Drawing.Size(101, 23);
            this.lblStockTitle.TabIndex = 0;
            this.lblStockTitle.Text = "Stock actual";
            // 
            // pnlVentas
            // 
            this.pnlVentas.BackColor = System.Drawing.Color.White;
            this.pnlVentas.Controls.Add(this.lblVentasVal);
            this.pnlVentas.Controls.Add(this.lblVentasTitle);
            this.pnlVentas.Location = new System.Drawing.Point(853, 62);
            this.pnlVentas.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlVentas.Name = "pnlVentas";
            this.pnlVentas.Size = new System.Drawing.Size(400, 148);
            this.pnlVentas.TabIndex = 3;
            // 
            // lblVentasVal
            // 
            this.lblVentasVal.AutoSize = true;
            this.lblVentasVal.Font = new System.Drawing.Font("Segoe UI", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblVentasVal.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(41)))), ((int)(((byte)(59)))));
            this.lblVentasVal.Location = new System.Drawing.Point(27, 68);
            this.lblVentasVal.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblVentasVal.Name = "lblVentasVal";
            this.lblVentasVal.Size = new System.Drawing.Size(233, 54);
            this.lblVentasVal.TabIndex = 1;
            this.lblVentasVal.Text = "S/ 1500 💰";
            // 
            // lblVentasTitle
            // 
            this.lblVentasTitle.AutoSize = true;
            this.lblVentasTitle.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblVentasTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(100)))), ((int)(((byte)(116)))), ((int)(((byte)(139)))));
            this.lblVentasTitle.Location = new System.Drawing.Point(27, 25);
            this.lblVentasTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblVentasTitle.Name = "lblVentasTitle";
            this.lblVentasTitle.Size = new System.Drawing.Size(94, 23);
            this.lblVentasTitle.TabIndex = 0;
            this.lblVentasTitle.Text = "Ventas hoy";
            // 
            // pnlAlimento
            // 
            this.pnlAlimento.BackColor = System.Drawing.Color.White;
            this.pnlAlimento.Controls.Add(this.lblAlimentoVal);
            this.pnlAlimento.Controls.Add(this.lblAlimentoTitle);
            this.pnlAlimento.Location = new System.Drawing.Point(1280, 62);
            this.pnlAlimento.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlAlimento.Name = "pnlAlimento";
            this.pnlAlimento.Size = new System.Drawing.Size(400, 148);
            this.pnlAlimento.TabIndex = 4;
            // 
            // lblAlimentoVal
            // 
            this.lblAlimentoVal.AutoSize = true;
            this.lblAlimentoVal.Font = new System.Drawing.Font("Segoe UI", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblAlimentoVal.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(41)))), ((int)(((byte)(59)))));
            this.lblAlimentoVal.Location = new System.Drawing.Point(27, 68);
            this.lblAlimentoVal.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblAlimentoVal.Name = "lblAlimentoVal";
            this.lblAlimentoVal.Size = new System.Drawing.Size(271, 54);
            this.lblAlimentoVal.TabIndex = 1;
            this.lblAlimentoVal.Text = "300 sacos 🌾";
            // 
            // lblAlimentoTitle
            // 
            this.lblAlimentoTitle.AutoSize = true;
            this.lblAlimentoTitle.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblAlimentoTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(100)))), ((int)(((byte)(116)))), ((int)(((byte)(139)))));
            this.lblAlimentoTitle.Location = new System.Drawing.Point(27, 25);
            this.lblAlimentoTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblAlimentoTitle.Name = "lblAlimentoTitle";
            this.lblAlimentoTitle.Size = new System.Drawing.Size(123, 23);
            this.lblAlimentoTitle.TabIndex = 2;
            this.lblAlimentoTitle.Text = "Alimento stock";
            // 
            // pnlAlertas
            // 
            this.pnlAlertas.BackColor = System.Drawing.Color.White;
            this.pnlAlertas.Controls.Add(this.lblAlertasTitle);
            this.pnlAlertas.Controls.Add(this.lblAlerta1);
            this.pnlAlertas.Controls.Add(this.lblAlerta2);
            this.pnlAlertas.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlAlertas.Location = new System.Drawing.Point(0, 222);
            this.pnlAlertas.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlAlertas.Name = "pnlAlertas";
            this.pnlAlertas.Size = new System.Drawing.Size(1787, 222);
            this.pnlAlertas.TabIndex = 1;
            // 
            // lblAlertasTitle
            // 
            this.lblAlertasTitle.AutoSize = true;
            this.lblAlertasTitle.Font = new System.Drawing.Font("Segoe UI", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblAlertasTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(41)))), ((int)(((byte)(59)))));
            this.lblAlertasTitle.Location = new System.Drawing.Point(27, 25);
            this.lblAlertasTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblAlertasTitle.Name = "lblAlertasTitle";
            this.lblAlertasTitle.Size = new System.Drawing.Size(196, 32);
            this.lblAlertasTitle.TabIndex = 0;
            this.lblAlertasTitle.Text = "⚠️ 🔔 ALERTAS";
            // 
            // lblAlerta1
            // 
            this.lblAlerta1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(251)))), ((int)(((byte)(235)))));
            this.lblAlerta1.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblAlerta1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(146)))), ((int)(((byte)(64)))), ((int)(((byte)(14)))));
            this.lblAlerta1.Location = new System.Drawing.Point(27, 74);
            this.lblAlerta1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblAlerta1.Name = "lblAlerta1";
            this.lblAlerta1.Size = new System.Drawing.Size(1733, 49);
            this.lblAlerta1.TabIndex = 1;
            this.lblAlerta1.Text = "⚠️ Bajo stock de alimento";
            this.lblAlerta1.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lblAlerta2
            // 
            this.lblAlerta2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(251)))), ((int)(((byte)(235)))));
            this.lblAlerta2.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblAlerta2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(146)))), ((int)(((byte)(64)))), ((int)(((byte)(14)))));
            this.lblAlerta2.Location = new System.Drawing.Point(27, 135);
            this.lblAlerta2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblAlerta2.Name = "lblAlerta2";
            this.lblAlerta2.Size = new System.Drawing.Size(1733, 49);
            this.lblAlerta2.TabIndex = 2;
            this.lblAlerta2.Text = "⚠️ Diferencia en inventario";
            this.lblAlerta2.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // pnlRendimiento
            // 
            this.pnlRendimiento.BackColor = System.Drawing.Color.Teal;
            this.pnlRendimiento.Controls.Add(this.lblRendimientoTitle);
            this.pnlRendimiento.Controls.Add(this.lblPromedioTitle);
            this.pnlRendimiento.Controls.Add(this.lblPromedio);
            this.pnlRendimiento.Controls.Add(this.lblConsumoTitle);
            this.pnlRendimiento.Controls.Add(this.lblConsumo);
            this.pnlRendimiento.Controls.Add(this.lblTasaTitle);
            this.pnlRendimiento.Controls.Add(this.lblTasa);
            this.pnlRendimiento.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlRendimiento.Location = new System.Drawing.Point(0, 444);
            this.pnlRendimiento.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.pnlRendimiento.Name = "pnlRendimiento";
            this.pnlRendimiento.Size = new System.Drawing.Size(1787, 319);
            this.pnlRendimiento.TabIndex = 2;
            // 
            // lblRendimientoTitle
            // 
            this.lblRendimientoTitle.AutoSize = true;
            this.lblRendimientoTitle.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblRendimientoTitle.ForeColor = System.Drawing.Color.White;
            this.lblRendimientoTitle.Location = new System.Drawing.Point(27, 25);
            this.lblRendimientoTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblRendimientoTitle.Name = "lblRendimientoTitle";
            this.lblRendimientoTitle.Size = new System.Drawing.Size(324, 37);
            this.lblRendimientoTitle.TabIndex = 0;
            this.lblRendimientoTitle.Text = "📈 Rendimiento del Día";
            // 
            // lblPromedioTitle
            // 
            this.lblPromedioTitle.AutoSize = true;
            this.lblPromedioTitle.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblPromedioTitle.ForeColor = System.Drawing.Color.White;
            this.lblPromedioTitle.Location = new System.Drawing.Point(27, 98);
            this.lblPromedioTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblPromedioTitle.Name = "lblPromedioTitle";
            this.lblPromedioTitle.Size = new System.Drawing.Size(173, 23);
            this.lblPromedioTitle.TabIndex = 1;
            this.lblPromedioTitle.Text = "Promedio por galpón";
            // 
            // lblPromedio
            // 
            this.lblPromedio.AutoSize = true;
            this.lblPromedio.Font = new System.Drawing.Font("Segoe UI", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblPromedio.ForeColor = System.Drawing.Color.White;
            this.lblPromedio.Location = new System.Drawing.Point(27, 135);
            this.lblPromedio.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblPromedio.Name = "lblPromedio";
            this.lblPromedio.Size = new System.Drawing.Size(202, 46);
            this.lblPromedio.TabIndex = 2;
            this.lblPromedio.Text = "300 huevos";
            // 
            // lblConsumoTitle
            // 
            this.lblConsumoTitle.AutoSize = true;
            this.lblConsumoTitle.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblConsumoTitle.ForeColor = System.Drawing.Color.White;
            this.lblConsumoTitle.Location = new System.Drawing.Point(533, 98);
            this.lblConsumoTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblConsumoTitle.Name = "lblConsumoTitle";
            this.lblConsumoTitle.Size = new System.Drawing.Size(155, 23);
            this.lblConsumoTitle.Text = "Consumo alimento";
            // 
            // lblConsumo
            // 
            this.lblConsumo.AutoSize = true;
            this.lblConsumo.Font = new System.Drawing.Font("Segoe UI", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblConsumo.ForeColor = System.Drawing.Color.White;
            this.lblConsumo.Location = new System.Drawing.Point(533, 135);
            this.lblConsumo.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblConsumo.Name = "lblConsumo";
            this.lblConsumo.Size = new System.Drawing.Size(154, 46);
            this.lblConsumo.TabIndex = 4;
            this.lblConsumo.Text = "20 sacos";
            // 
            // lblTasaTitle
            // 
            this.lblTasaTitle.AutoSize = true;
            this.lblTasaTitle.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblTasaTitle.ForeColor = System.Drawing.Color.White;
            this.lblTasaTitle.Location = new System.Drawing.Point(1040, 98);
            this.lblTasaTitle.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblTasaTitle.Name = "lblTasaTitle";
            this.lblTasaTitle.Size = new System.Drawing.Size(157, 23);
            this.lblTasaTitle.TabIndex = 5;
            this.lblTasaTitle.Text = "Tasa de producción";
            // 
            // lblTasa
            // 
            this.lblTasa.AutoSize = true;
            this.lblTasa.Font = new System.Drawing.Font("Segoe UI", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblTasa.ForeColor = System.Drawing.Color.White;
            this.lblTasa.Location = new System.Drawing.Point(1040, 135);
            this.lblTasa.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblTasa.Name = "lblTasa";
            this.lblTasa.Size = new System.Drawing.Size(89, 46);
            this.lblTasa.TabIndex = 6;
            this.lblTasa.Text = "85%";
            // 
            // DashboardUserControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.Controls.Add(this.pnlRendimiento);
            this.Controls.Add(this.pnlAlertas);
            this.Controls.Add(this.pnlResumen);
            this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.Name = "DashboardUserControl";
            this.Size = new System.Drawing.Size(1787, 763);
            this.pnlResumen.ResumeLayout(false);
            this.pnlResumen.PerformLayout();
            this.pnlHuevos.ResumeLayout(false);
            this.pnlHuevos.PerformLayout();
            this.pnlStock.ResumeLayout(false);
            this.pnlStock.PerformLayout();
            this.pnlVentas.ResumeLayout(false);
            this.pnlVentas.PerformLayout();
            this.pnlAlimento.ResumeLayout(false);
            this.pnlAlimento.PerformLayout();
            this.pnlAlertas.ResumeLayout(false);
            this.pnlAlertas.PerformLayout();
            this.pnlRendimiento.ResumeLayout(false);
            this.pnlRendimiento.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlResumen;
        private System.Windows.Forms.Label lblResumenTitle;
        private System.Windows.Forms.Panel pnlHuevos;
        private System.Windows.Forms.Label lblHuevosVal;
        private System.Windows.Forms.Label lblHuevosTitle;
        private System.Windows.Forms.Panel pnlStock;
        private System.Windows.Forms.Label lblStockVal;
        private System.Windows.Forms.Label lblStockTitle;
        private System.Windows.Forms.Panel pnlVentas;
        private System.Windows.Forms.Label lblVentasVal;
        private System.Windows.Forms.Label lblVentasTitle;
        private System.Windows.Forms.Panel pnlAlimento;
        private System.Windows.Forms.Label lblAlimentoVal;
        private System.Windows.Forms.Label lblAlimentoTitle;
        private System.Windows.Forms.Panel pnlAlertas;
        private System.Windows.Forms.Label lblAlertasTitle;
        private System.Windows.Forms.Label lblAlerta1;
        private System.Windows.Forms.Label lblAlerta2;
        private System.Windows.Forms.Panel pnlRendimiento;
        private System.Windows.Forms.Label lblRendimientoTitle;
        private System.Windows.Forms.Label lblPromedioTitle;
        private System.Windows.Forms.Label lblPromedio;
        private System.Windows.Forms.Label lblConsumoTitle;
        private System.Windows.Forms.Label lblConsumo;
        private System.Windows.Forms.Label lblTasaTitle;
        private System.Windows.Forms.Label lblTasa;
    }
}
