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

        #region Component Designer generated code

        private void InitializeComponent()
        {
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea4 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend4 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series5 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea5 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend5 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series6 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea6 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend6 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series7 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.Series series8 = new System.Windows.Forms.DataVisualization.Charting.Series();
            this.pnlMain = new System.Windows.Forms.Panel();
            this.pnlContenido = new System.Windows.Forms.Panel();
            this.pnlStock = new System.Windows.Forms.Panel();
            this.chartStock = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.pnlStockTitulo = new System.Windows.Forms.Panel();
            this.lblStockTitulo = new System.Windows.Forms.Label();
            this.pnlResumenStock = new System.Windows.Forms.Panel();
            this.lblAlimentoStock = new System.Windows.Forms.Label();
            this.lblAlimentoLabel = new System.Windows.Forms.Label();
            this.lblHuevosStock = new System.Windows.Forms.Label();
            this.lblHuevosLabel = new System.Windows.Forms.Label();
            this.pnlVentas = new System.Windows.Forms.Panel();
            this.chartVentas = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.pnlVentasTitulo = new System.Windows.Forms.Panel();
            this.lblVentasTitulo = new System.Windows.Forms.Label();
            this.pnlResumenVentas = new System.Windows.Forms.Panel();
            this.lblMejorDia = new System.Windows.Forms.Label();
            this.lblMejorDiaLabel = new System.Windows.Forms.Label();
            this.lblPromedioDiario = new System.Windows.Forms.Label();
            this.lblPromedioDiarioLabel = new System.Windows.Forms.Label();
            this.lblTotalSemanal = new System.Windows.Forms.Label();
            this.lblTotalSemanalLabel = new System.Windows.Forms.Label();
            this.pnlProduccion = new System.Windows.Forms.Panel();
            this.chartProduccion = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.pnlProduccionTitulo = new System.Windows.Forms.Panel();
            this.lblProduccionTitulo = new System.Windows.Forms.Label();
            this.dgvProduccion = new System.Windows.Forms.DataGridView();
            this.pnlTabs = new System.Windows.Forms.Panel();
            this.btnTabProduccion = new System.Windows.Forms.Button();
            this.btnTabVentas = new System.Windows.Forms.Button();
            this.btnTabStock = new System.Windows.Forms.Button();
            this.pnlTitulo = new System.Windows.Forms.Panel();
            this.lblTitulo = new System.Windows.Forms.Label();
            this.pnlMain.SuspendLayout();
            this.pnlContenido.SuspendLayout();
            this.pnlStock.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.chartStock)).BeginInit();
            this.pnlStockTitulo.SuspendLayout();
            this.pnlResumenStock.SuspendLayout();
            this.pnlVentas.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.chartVentas)).BeginInit();
            this.pnlVentasTitulo.SuspendLayout();
            this.pnlResumenVentas.SuspendLayout();
            this.pnlProduccion.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.chartProduccion)).BeginInit();
            this.pnlProduccionTitulo.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvProduccion)).BeginInit();
            this.pnlTabs.SuspendLayout();
            this.pnlTitulo.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlMain
            // 
            this.pnlMain.AutoScroll = true;
            this.pnlMain.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.pnlMain.Controls.Add(this.pnlTabs);
            this.pnlMain.Controls.Add(this.pnlTitulo);
            this.pnlMain.Controls.Add(this.pnlContenido);
            this.pnlMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMain.Location = new System.Drawing.Point(0, 0);
            this.pnlMain.Name = "pnlMain";
            this.pnlMain.Padding = new System.Windows.Forms.Padding(20);
            this.pnlMain.Size = new System.Drawing.Size(1800, 1200);
            this.pnlMain.TabIndex = 0;
            // 
            // pnlContenido
            // 
            this.pnlContenido.BackColor = System.Drawing.Color.White;
            this.pnlContenido.Controls.Add(this.pnlStock);
            this.pnlContenido.Controls.Add(this.pnlVentas);
            this.pnlContenido.Controls.Add(this.pnlProduccion);
            this.pnlContenido.Location = new System.Drawing.Point(20, 240);
            this.pnlContenido.Name = "pnlContenido";
            this.pnlContenido.Padding = new System.Windows.Forms.Padding(20);
            this.pnlContenido.Size = new System.Drawing.Size(1760, 900);
            this.pnlContenido.TabIndex = 2;
            // 
            // pnlStock
            // 
            this.pnlStock.Controls.Add(this.chartStock);
            this.pnlStock.Controls.Add(this.pnlStockTitulo);
            this.pnlStock.Controls.Add(this.pnlResumenStock);
            this.pnlStock.Location = new System.Drawing.Point(20, 20);
            this.pnlStock.Name = "pnlStock";
            this.pnlStock.Size = new System.Drawing.Size(1720, 860);
            this.pnlStock.TabIndex = 2;
            this.pnlStock.Visible = false;
            // 
            // chartStock
            // 
            chartArea4.Name = "ChartArea1";
            this.chartStock.ChartAreas.Add(chartArea4);
            legend4.Name = "Legend1";
            this.chartStock.Legends.Add(legend4);
            this.chartStock.Location = new System.Drawing.Point(0, 70);
            this.chartStock.Name = "chartStock";
            series5.ChartArea = "ChartArea1";
            series5.Legend = "Legend1";
            series5.Name = "Series1";
            this.chartStock.Series.Add(series5);
            this.chartStock.Size = new System.Drawing.Size(1720, 790);
            this.chartStock.TabIndex = 2;
            this.chartStock.Text = "chartStock";
            // 
            // pnlStockTitulo
            // 
            this.pnlStockTitulo.Controls.Add(this.lblStockTitulo);
            this.pnlStockTitulo.Location = new System.Drawing.Point(0, 0);
            this.pnlStockTitulo.Name = "pnlStockTitulo";
            this.pnlStockTitulo.Size = new System.Drawing.Size(1720, 60);
            this.pnlStockTitulo.TabIndex = 0;
            // 
            // lblStockTitulo
            // 
            this.lblStockTitulo.AutoSize = true;
            this.lblStockTitulo.Font = new System.Drawing.Font("Segoe UI", 14F, System.Drawing.FontStyle.Bold);
            this.lblStockTitulo.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblStockTitulo.Location = new System.Drawing.Point(15, 15);
            this.lblStockTitulo.Name = "lblStockTitulo";
            this.lblStockTitulo.Size = new System.Drawing.Size(155, 32);
            this.lblStockTitulo.TabIndex = 0;
            this.lblStockTitulo.Text = "Stock Actual";
            // 
            // pnlResumenStock
            // 
            this.pnlResumenStock.Controls.Add(this.lblAlimentoStock);
            this.pnlResumenStock.Controls.Add(this.lblAlimentoLabel);
            this.pnlResumenStock.Controls.Add(this.lblHuevosStock);
            this.pnlResumenStock.Controls.Add(this.lblHuevosLabel);
            this.pnlResumenStock.Location = new System.Drawing.Point(0, 70);
            this.pnlResumenStock.Name = "pnlResumenStock";
            this.pnlResumenStock.Size = new System.Drawing.Size(1720, 790);
            this.pnlResumenStock.TabIndex = 1;
            this.pnlResumenStock.Visible = false;
            // 
            // lblAlimentoStock
            // 
            this.lblAlimentoStock.AutoSize = true;
            this.lblAlimentoStock.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold);
            this.lblAlimentoStock.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(140)))), ((int)(((byte)(0)))));
            this.lblAlimentoStock.Location = new System.Drawing.Point(900, 180);
            this.lblAlimentoStock.Name = "lblAlimentoStock";
            this.lblAlimentoStock.Size = new System.Drawing.Size(151, 41);
            this.lblAlimentoStock.TabIndex = 3;
            this.lblAlimentoStock.Text = "300 sacos";
            // 
            // lblAlimentoLabel
            // 
            this.lblAlimentoLabel.AutoSize = true;
            this.lblAlimentoLabel.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.lblAlimentoLabel.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblAlimentoLabel.Location = new System.Drawing.Point(900, 140);
            this.lblAlimentoLabel.Name = "lblAlimentoLabel";
            this.lblAlimentoLabel.Size = new System.Drawing.Size(148, 23);
            this.lblAlimentoLabel.TabIndex = 2;
            this.lblAlimentoLabel.Text = "Alimento en Stock";
            // 
            // lblHuevosStock
            // 
            this.lblHuevosStock.AutoSize = true;
            this.lblHuevosStock.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold);
            this.lblHuevosStock.ForeColor = System.Drawing.Color.Teal;
            this.lblHuevosStock.Location = new System.Drawing.Point(900, 80);
            this.lblHuevosStock.Name = "lblHuevosStock";
            this.lblHuevosStock.Size = new System.Drawing.Size(94, 41);
            this.lblHuevosStock.TabIndex = 1;
            this.lblHuevosStock.Text = "8,500";
            // 
            // lblHuevosLabel
            // 
            this.lblHuevosLabel.AutoSize = true;
            this.lblHuevosLabel.Font = new System.Drawing.Font("Segoe UI", 10F);
            this.lblHuevosLabel.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblHuevosLabel.Location = new System.Drawing.Point(900, 40);
            this.lblHuevosLabel.Name = "lblHuevosLabel";
            this.lblHuevosLabel.Size = new System.Drawing.Size(135, 23);
            this.lblHuevosLabel.TabIndex = 0;
            this.lblHuevosLabel.Text = "Huevos en Stock";
            // 
            // pnlVentas
            // 
            this.pnlVentas.Controls.Add(this.chartVentas);
            this.pnlVentas.Controls.Add(this.pnlVentasTitulo);
            this.pnlVentas.Controls.Add(this.pnlResumenVentas);
            this.pnlVentas.Location = new System.Drawing.Point(20, 20);
            this.pnlVentas.Name = "pnlVentas";
            this.pnlVentas.Size = new System.Drawing.Size(1720, 860);
            this.pnlVentas.TabIndex = 1;
            this.pnlVentas.Visible = false;
            // 
            // chartVentas
            // 
            chartArea5.Name = "ChartArea1";
            this.chartVentas.ChartAreas.Add(chartArea5);
            legend5.Name = "Legend1";
            this.chartVentas.Legends.Add(legend5);
            this.chartVentas.Location = new System.Drawing.Point(0, 70);
            this.chartVentas.Name = "chartVentas";
            series6.ChartArea = "ChartArea1";
            series6.Color = System.Drawing.Color.Teal;
            series6.Legend = "Legend1";
            series6.Name = "Ventas (S/)";
            this.chartVentas.Series.Add(series6);
            this.chartVentas.Size = new System.Drawing.Size(1720, 470);
            this.chartVentas.TabIndex = 2;
            this.chartVentas.Text = "chartVentas";
            // 
            // pnlVentasTitulo
            // 
            this.pnlVentasTitulo.Controls.Add(this.lblVentasTitulo);
            this.pnlVentasTitulo.Location = new System.Drawing.Point(0, 0);
            this.pnlVentasTitulo.Name = "pnlVentasTitulo";
            this.pnlVentasTitulo.Size = new System.Drawing.Size(1720, 60);
            this.pnlVentasTitulo.TabIndex = 0;
            // 
            // lblVentasTitulo
            // 
            this.lblVentasTitulo.AutoSize = true;
            this.lblVentasTitulo.Font = new System.Drawing.Font("Segoe UI", 14F, System.Drawing.FontStyle.Bold);
            this.lblVentasTitulo.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblVentasTitulo.Location = new System.Drawing.Point(15, 15);
            this.lblVentasTitulo.Name = "lblVentasTitulo";
            this.lblVentasTitulo.Size = new System.Drawing.Size(175, 32);
            this.lblVentasTitulo.TabIndex = 0;
            this.lblVentasTitulo.Text = "Ventas Diarias";
            // 
            // pnlResumenVentas
            // 
            this.pnlResumenVentas.Controls.Add(this.lblMejorDia);
            this.pnlResumenVentas.Controls.Add(this.lblMejorDiaLabel);
            this.pnlResumenVentas.Controls.Add(this.lblPromedioDiario);
            this.pnlResumenVentas.Controls.Add(this.lblPromedioDiarioLabel);
            this.pnlResumenVentas.Controls.Add(this.lblTotalSemanal);
            this.pnlResumenVentas.Controls.Add(this.lblTotalSemanalLabel);
            this.pnlResumenVentas.Location = new System.Drawing.Point(0, 550);
            this.pnlResumenVentas.Name = "pnlResumenVentas";
            this.pnlResumenVentas.Size = new System.Drawing.Size(1720, 310);
            this.pnlResumenVentas.TabIndex = 1;
            // 
            // lblMejorDia
            // 
            this.lblMejorDia.AutoSize = true;
            this.lblMejorDia.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Bold);
            this.lblMejorDia.ForeColor = System.Drawing.Color.Purple;
            this.lblMejorDia.Location = new System.Drawing.Point(1170, 50);
            this.lblMejorDia.Name = "lblMejorDia";
            this.lblMejorDia.Size = new System.Drawing.Size(115, 37);
            this.lblMejorDia.TabIndex = 5;
            this.lblMejorDia.Text = "S/ 1200";
            // 
            // lblMejorDiaLabel
            // 
            this.lblMejorDiaLabel.AutoSize = true;
            this.lblMejorDiaLabel.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.lblMejorDiaLabel.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblMejorDiaLabel.Location = new System.Drawing.Point(1170, 20);
            this.lblMejorDiaLabel.Name = "lblMejorDiaLabel";
            this.lblMejorDiaLabel.Size = new System.Drawing.Size(75, 20);
            this.lblMejorDiaLabel.TabIndex = 4;
            this.lblMejorDiaLabel.Text = "Mejor Día";
            // 
            // lblPromedioDiario
            // 
            this.lblPromedioDiario.AutoSize = true;
            this.lblPromedioDiario.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Bold);
            this.lblPromedioDiario.ForeColor = System.Drawing.Color.RoyalBlue;
            this.lblPromedioDiario.Location = new System.Drawing.Point(600, 50);
            this.lblPromedioDiario.Name = "lblPromedioDiario";
            this.lblPromedioDiario.Size = new System.Drawing.Size(138, 37);
            this.lblPromedioDiario.TabIndex = 3;
            this.lblPromedioDiario.Text = "S/ 914.29";
            // 
            // lblPromedioDiarioLabel
            // 
            this.lblPromedioDiarioLabel.AutoSize = true;
            this.lblPromedioDiarioLabel.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.lblPromedioDiarioLabel.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblPromedioDiarioLabel.Location = new System.Drawing.Point(600, 20);
            this.lblPromedioDiarioLabel.Name = "lblPromedioDiarioLabel";
            this.lblPromedioDiarioLabel.Size = new System.Drawing.Size(119, 20);
            this.lblPromedioDiarioLabel.TabIndex = 2;
            this.lblPromedioDiarioLabel.Text = "Promedio Diario";
            // 
            // lblTotalSemanal
            // 
            this.lblTotalSemanal.AutoSize = true;
            this.lblTotalSemanal.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Bold);
            this.lblTotalSemanal.ForeColor = System.Drawing.Color.Teal;
            this.lblTotalSemanal.Location = new System.Drawing.Point(30, 50);
            this.lblTotalSemanal.Name = "lblTotalSemanal";
            this.lblTotalSemanal.Size = new System.Drawing.Size(161, 37);
            this.lblTotalSemanal.TabIndex = 1;
            this.lblTotalSemanal.Text = "S/ 6,400.00";
            // 
            // lblTotalSemanalLabel
            // 
            this.lblTotalSemanalLabel.AutoSize = true;
            this.lblTotalSemanalLabel.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.lblTotalSemanalLabel.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.lblTotalSemanalLabel.Location = new System.Drawing.Point(30, 20);
            this.lblTotalSemanalLabel.Name = "lblTotalSemanalLabel";
            this.lblTotalSemanalLabel.Size = new System.Drawing.Size(103, 20);
            this.lblTotalSemanalLabel.TabIndex = 0;
            this.lblTotalSemanalLabel.Text = "Total Semanal";
            // 
            // pnlProduccion
            // 
            this.pnlProduccion.Controls.Add(this.chartProduccion);
            this.pnlProduccion.Controls.Add(this.pnlProduccionTitulo);
            this.pnlProduccion.Controls.Add(this.dgvProduccion);
            this.pnlProduccion.Location = new System.Drawing.Point(20, 20);
            this.pnlProduccion.Name = "pnlProduccion";
            this.pnlProduccion.Size = new System.Drawing.Size(1720, 860);
            this.pnlProduccion.TabIndex = 0;
            // 
            // chartProduccion
            // 
            chartArea6.Name = "ChartArea1";
            this.chartProduccion.ChartAreas.Add(chartArea6);
            legend6.Name = "Legend1";
            this.chartProduccion.Legends.Add(legend6);
            this.chartProduccion.Location = new System.Drawing.Point(0, 70);
            this.chartProduccion.Name = "chartProduccion";
            series7.ChartArea = "ChartArea1";
            series7.Color = System.Drawing.Color.Teal;
            series7.Legend = "Legend1";
            series7.Name = "Huevos del día";
            series8.ChartArea = "ChartArea1";
            series8.Color = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(140)))), ((int)(((byte)(0)))));
            series8.Legend = "Legend1";
            series8.Name = "Huevos semanal";
            this.chartProduccion.Series.Add(series7);
            this.chartProduccion.Series.Add(series8);
            this.chartProduccion.Size = new System.Drawing.Size(1720, 450);
            this.chartProduccion.TabIndex = 2;
            this.chartProduccion.Text = "chartProduccion";
            // 
            // pnlProduccionTitulo
            // 
            this.pnlProduccionTitulo.Controls.Add(this.lblProduccionTitulo);
            this.pnlProduccionTitulo.Location = new System.Drawing.Point(0, 0);
            this.pnlProduccionTitulo.Name = "pnlProduccionTitulo";
            this.pnlProduccionTitulo.Size = new System.Drawing.Size(1720, 60);
            this.pnlProduccionTitulo.TabIndex = 0;
            // 
            // lblProduccionTitulo
            // 
            this.lblProduccionTitulo.AutoSize = true;
            this.lblProduccionTitulo.Font = new System.Drawing.Font("Segoe UI", 14F, System.Drawing.FontStyle.Bold);
            this.lblProduccionTitulo.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblProduccionTitulo.Location = new System.Drawing.Point(15, 15);
            this.lblProduccionTitulo.Name = "lblProduccionTitulo";
            this.lblProduccionTitulo.Size = new System.Drawing.Size(281, 32);
            this.lblProduccionTitulo.TabIndex = 0;
            this.lblProduccionTitulo.Text = "Producción por Galpón";
            // 
            // dgvProduccion
            // 
            this.dgvProduccion.AllowUserToAddRows = false;
            this.dgvProduccion.AllowUserToDeleteRows = false;
            this.dgvProduccion.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgvProduccion.BackgroundColor = System.Drawing.Color.White;
            this.dgvProduccion.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvProduccion.Location = new System.Drawing.Point(0, 530);
            this.dgvProduccion.Name = "dgvProduccion";
            this.dgvProduccion.ReadOnly = true;
            this.dgvProduccion.RowHeadersWidth = 51;
            this.dgvProduccion.Size = new System.Drawing.Size(1720, 330);
            this.dgvProduccion.TabIndex = 1;
            // 
            // pnlTabs
            // 
            this.pnlTabs.BackColor = System.Drawing.Color.White;
            this.pnlTabs.Controls.Add(this.btnTabProduccion);
            this.pnlTabs.Controls.Add(this.btnTabVentas);
            this.pnlTabs.Controls.Add(this.btnTabStock);
            this.pnlTabs.Location = new System.Drawing.Point(20, 140);
            this.pnlTabs.Name = "pnlTabs";
            this.pnlTabs.Padding = new System.Windows.Forms.Padding(15);
            this.pnlTabs.Size = new System.Drawing.Size(1760, 80);
            this.pnlTabs.TabIndex = 1;
            // 
            // btnTabProduccion
            // 
            this.btnTabProduccion.BackColor = System.Drawing.Color.Teal;
            this.btnTabProduccion.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnTabProduccion.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.btnTabProduccion.ForeColor = System.Drawing.Color.White;
            this.btnTabProduccion.Location = new System.Drawing.Point(20, 15);
            this.btnTabProduccion.Name = "btnTabProduccion";
            this.btnTabProduccion.Size = new System.Drawing.Size(200, 50);
            this.btnTabProduccion.TabIndex = 0;
            this.btnTabProduccion.Text = "Producción por galpón";
            this.btnTabProduccion.UseVisualStyleBackColor = false;
            // 
            // btnTabVentas
            // 
            this.btnTabVentas.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(240)))), ((int)(((byte)(240)))), ((int)(((byte)(240)))));
            this.btnTabVentas.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnTabVentas.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.btnTabVentas.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.btnTabVentas.Location = new System.Drawing.Point(240, 15);
            this.btnTabVentas.Name = "btnTabVentas";
            this.btnTabVentas.Size = new System.Drawing.Size(150, 50);
            this.btnTabVentas.TabIndex = 1;
            this.btnTabVentas.Text = "Ventas diarias";
            this.btnTabVentas.UseVisualStyleBackColor = false;
            // 
            // btnTabStock
            // 
            this.btnTabStock.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(240)))), ((int)(((byte)(240)))), ((int)(((byte)(240)))));
            this.btnTabStock.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnTabStock.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.btnTabStock.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(73)))), ((int)(((byte)(80)))), ((int)(((byte)(87)))));
            this.btnTabStock.Location = new System.Drawing.Point(410, 15);
            this.btnTabStock.Name = "btnTabStock";
            this.btnTabStock.Size = new System.Drawing.Size(130, 50);
            this.btnTabStock.TabIndex = 2;
            this.btnTabStock.Text = "Stock actual";
            this.btnTabStock.UseVisualStyleBackColor = false;
            // 
            // pnlTitulo
            // 
            this.pnlTitulo.BackColor = System.Drawing.Color.White;
            this.pnlTitulo.Controls.Add(this.lblTitulo);
            this.pnlTitulo.Location = new System.Drawing.Point(20, 20);
            this.pnlTitulo.Name = "pnlTitulo";
            this.pnlTitulo.Padding = new System.Windows.Forms.Padding(20);
            this.pnlTitulo.Size = new System.Drawing.Size(1760, 100);
            this.pnlTitulo.TabIndex = 0;
            // 
            // lblTitulo
            // 
            this.lblTitulo.AutoSize = true;
            this.lblTitulo.Font = new System.Drawing.Font("Segoe UI", 20F, System.Drawing.FontStyle.Bold);
            this.lblTitulo.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(33)))), ((int)(((byte)(37)))), ((int)(((byte)(41)))));
            this.lblTitulo.Location = new System.Drawing.Point(20, 25);
            this.lblTitulo.Name = "lblTitulo";
            this.lblTitulo.Size = new System.Drawing.Size(162, 46);
            this.lblTitulo.TabIndex = 0;
            this.lblTitulo.Text = "Reportes";
            // 
            // ReportesUserControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(248)))), ((int)(((byte)(249)))), ((int)(((byte)(250)))));
            this.Controls.Add(this.pnlMain);
            this.Name = "ReportesUserControl";
            this.Size = new System.Drawing.Size(1800, 1200);
            this.pnlMain.ResumeLayout(false);
            this.pnlContenido.ResumeLayout(false);
            this.pnlStock.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.chartStock)).EndInit();
            this.pnlStockTitulo.ResumeLayout(false);
            this.pnlStockTitulo.PerformLayout();
            this.pnlResumenStock.ResumeLayout(false);
            this.pnlResumenStock.PerformLayout();
            this.pnlVentas.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.chartVentas)).EndInit();
            this.pnlVentasTitulo.ResumeLayout(false);
            this.pnlVentasTitulo.PerformLayout();
            this.pnlResumenVentas.ResumeLayout(false);
            this.pnlResumenVentas.PerformLayout();
            this.pnlProduccion.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.chartProduccion)).EndInit();
            this.pnlProduccionTitulo.ResumeLayout(false);
            this.pnlProduccionTitulo.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvProduccion)).EndInit();
            this.pnlTabs.ResumeLayout(false);
            this.pnlTitulo.ResumeLayout(false);
            this.pnlTitulo.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlMain;
        private System.Windows.Forms.Panel pnlTitulo;
        private System.Windows.Forms.Label lblTitulo;
        private System.Windows.Forms.Panel pnlTabs;
        private System.Windows.Forms.Button btnTabProduccion;
        private System.Windows.Forms.Button btnTabVentas;
        private System.Windows.Forms.Button btnTabStock;
        private System.Windows.Forms.Panel pnlContenido;
        private System.Windows.Forms.Panel pnlProduccion;
        private System.Windows.Forms.Panel pnlProduccionTitulo;
        private System.Windows.Forms.Label lblProduccionTitulo;
        private System.Windows.Forms.DataGridView dgvProduccion;
        private System.Windows.Forms.Panel pnlVentas;
        private System.Windows.Forms.Panel pnlVentasTitulo;
        private System.Windows.Forms.Label lblVentasTitulo;
        private System.Windows.Forms.Panel pnlResumenVentas;
        private System.Windows.Forms.Label lblMejorDia;
        private System.Windows.Forms.Label lblMejorDiaLabel;
        private System.Windows.Forms.Label lblPromedioDiario;
        private System.Windows.Forms.Label lblPromedioDiarioLabel;
        private System.Windows.Forms.Label lblTotalSemanal;
        private System.Windows.Forms.Label lblTotalSemanalLabel;
        private System.Windows.Forms.Panel pnlStock;
        private System.Windows.Forms.Panel pnlStockTitulo;
        private System.Windows.Forms.Label lblStockTitulo;
        private System.Windows.Forms.Panel pnlResumenStock;
        private System.Windows.Forms.Label lblAlimentoStock;
        private System.Windows.Forms.Label lblAlimentoLabel;
        private System.Windows.Forms.Label lblHuevosStock;
        private System.Windows.Forms.Label lblHuevosLabel;
        private System.Windows.Forms.DataVisualization.Charting.Chart chartProduccion;
        private System.Windows.Forms.DataVisualization.Charting.Chart chartVentas;
        private System.Windows.Forms.DataVisualization.Charting.Chart chartStock;
    }
}
