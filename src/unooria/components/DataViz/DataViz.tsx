import React, { useState } from 'react';
import {
  BarChartProps,
  PositiveNegativeBarChartProps,
  LineChartProps,
  PieChartProps,
  SemiDonutChartProps,
  RadarChartProps,
  RadialBarChartProps,
  MetricCardProps,
  StackedProgressBarProps,
  CircularProgressBarProps,
  RankingCardProps,
  MultiBarDataPoint,
  DataPoint,
  RadarAxis,
  RadarSeries,
  TooltipState,
  UNOORIA_DATAVIZ_PALETTE,
} from './DataViz.types';
import './DataViz.css';

// ============================================================================
// Ícones Utilitários SVG
// ============================================================================
const CallMadeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const CallReceivedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="7" x2="17" y2="17" />
    <polyline points="17 7 17 17 7 17" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ============================================================================
// Balão / Tooltip Flutuante Inteligente Universal (Padrão Ouro)
// ============================================================================
export const DataVizTooltip: React.FC<{ tooltip: TooltipState | null }> = ({ tooltip }) => {
  if (!tooltip || !tooltip.visible) return null;

  return (
    <div
      className="unooria-dataviz__tooltip"
      style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
    >
      {tooltip.title && <div className="unooria-dataviz__tooltip-header">{tooltip.title}</div>}
      <div className="unooria-dataviz__tooltip-row">
        {tooltip.color && (
          <span className="unooria-dataviz__tooltip-dot" style={{ backgroundColor: tooltip.color }} />
        )}
        <span>{tooltip.label}:</span>
        <span className="unooria-dataviz__tooltip-value">{tooltip.value}</span>
      </div>
    </div>
  );
};

// ============================================================================
// 1. Gráfico de Barras (1, 2, 3 ou 4 barras) (#5843:564)
// ============================================================================
export const BarChart: React.FC<BarChartProps> = ({
  title = 'Title Example',
  subtitle = 'Subtitle Example',
  data = [],
  indicators,
  yAxisLabels = ['100', '75', '50', '25', '0'],
  showTooltip = true,
  theme = 'light',
  className = '',
  style,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const items = data as (MultiBarDataPoint & DataPoint)[];

  let maxVal = 100;
  items.forEach((d) => {
    if (d.values) {
      d.values.forEach((v) => { if (v > maxVal) maxVal = v; });
    } else if (d.value > maxVal) {
      maxVal = d.value;
    }
  });

  const defaultColors = ['#BDD0EF', '#7FA5E2', '#D3E0F5', '#A4BDE9'];

  return (
    <div
      className={`unooria-dataviz-card unooria-dataviz-card--theme-${theme} ${className}`.trim()}
      style={style}
      data-theme={theme}
      onMouseLeave={() => setTooltip(null)}
    >
      {showTooltip && <DataVizTooltip tooltip={tooltip} />}

      <div className="unooria-dataviz__header">
        <div className="unooria-dataviz__title-row">
          <h3 className="unooria-dataviz__title">{title}</h3>
        </div>
        <div className="unooria-dataviz__subtitle-row">
          <span className="unooria-dataviz__subtitle">{subtitle}</span>
          {indicators && indicators.length > 0 && (
            <div className="unooria-dataviz__indicators">
              {indicators.map((ind, idx) => (
                <div key={idx} className="unooria-dataviz__indicator">
                  <span className="unooria-dataviz__indicator-dot" style={{ backgroundColor: ind.color }} />
                  <span>{ind.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="unooria-dataviz__chart-area">
        <div className="unooria-dataviz__y-axis">
          {yAxisLabels.map((lbl, idx) => (
            <span key={idx}>{lbl}</span>
          ))}
        </div>

        <div className="unooria-dataviz__plot-container">
          <svg className="unooria-dataviz__svg-plot" viewBox="0 0 1000 240" preserveAspectRatio="none">
            {[0, 60, 120, 180, 240].map((y, idx) => (
              <line
                key={idx}
                x1="0"
                y1={y}
                x2="1000"
                y2={y}
                stroke={idx === 4 ? 'var(--chart-zero-line)' : 'var(--chart-grid)'}
                strokeWidth={idx === 4 ? '1.5' : '1'}
                strokeDasharray={idx === 4 ? 'none' : '4 6'}
              />
            ))}

            {items.map((item, idx) => {
              const groupWidth = 1000 / items.length;
              const xStart = idx * groupWidth + groupWidth * 0.15;
              const values = item.values || [item.value];
              const barCount = values.length;
              const barWidth = (groupWidth * 0.7) / barCount - 2;

              return (
                <g key={idx}>
                  {values.map((val, bIdx) => {
                    const barHeight = Math.max(4, (val / maxVal) * 230);
                    const barX = xStart + bIdx * (barWidth + 2);
                    const barY = 240 - barHeight;
                    const barColor = item.colors?.[bIdx] || defaultColors[bIdx % defaultColors.length];
                    const indLabel = indicators?.[bIdx]?.label || `Série ${bIdx + 1}`;

                    return (
                      <rect
                        key={bIdx}
                        x={barX}
                        y={barY}
                        width={Math.max(2, barWidth)}
                        height={barHeight}
                        fill={barColor}
                        className="unooria-dataviz__bar"
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const parentRect = e.currentTarget.closest('.unooria-dataviz-card')?.getBoundingClientRect();
                          if (parentRect) {
                            setTooltip({
                              visible: true,
                              x: rect.left - parentRect.left + rect.width / 2,
                              y: rect.top - parentRect.top,
                              title: item.label,
                              label: indLabel,
                              value: val,
                              color: barColor,
                            });
                          }
                        }}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>

          <div className="unooria-dataviz__x-axis">
            {items.map((item, idx) => (
              <span key={idx} style={{ flex: 1, textAlign: 'center' }}>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. Gráfico de Barras Positivo e Negativo (#5849:565)
// ============================================================================
export const PositiveNegativeBarChart: React.FC<PositiveNegativeBarChartProps> = ({
  title = 'Gráfico de Barras Positivas e Negativas',
  subtitle = 'Subtitle Example',
  data = [],
  indicators,
  yAxisLabels = ['+100', '+50', '0', '-50', '-100'],
  showTooltip = true,
  theme = 'light',
  className = '',
  style,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const defaultPosColors = ['#7FA5E2', '#A4BDE9', '#BDD0EF', '#D3E0F5'];
  const defaultNegColors = ['#01B574', '#7FA5E2', '#A4BDE9', '#BDD0EF'];

  return (
    <div
      className={`unooria-dataviz-card unooria-dataviz-card--theme-${theme} ${className}`.trim()}
      style={style}
      data-theme={theme}
      onMouseLeave={() => setTooltip(null)}
    >
      {showTooltip && <DataVizTooltip tooltip={tooltip} />}

      <div className="unooria-dataviz__header">
        <div className="unooria-dataviz__title-row">
          <h3 className="unooria-dataviz__title">{title}</h3>
        </div>
        <div className="unooria-dataviz__subtitle-row">
          <span className="unooria-dataviz__subtitle">{subtitle}</span>
          {indicators && (
            <div className="unooria-dataviz__indicators">
              {indicators.map((ind, idx) => (
                <div key={idx} className="unooria-dataviz__indicator">
                  <span className="unooria-dataviz__indicator-dot" style={{ backgroundColor: ind.color }} />
                  <span>{ind.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="unooria-dataviz__chart-area">
        <div className="unooria-dataviz__y-axis">
          {yAxisLabels.map((lbl, idx) => (
            <span key={idx}>{lbl}</span>
          ))}
        </div>

        <div className="unooria-dataviz__plot-container">
          <svg className="unooria-dataviz__svg-plot" viewBox="0 0 1000 240" preserveAspectRatio="none">
            {[0, 60, 120, 180, 240].map((y, idx) => (
              <line
                key={idx}
                x1="0"
                y1={y}
                x2="1000"
                y2={y}
                stroke={idx === 2 ? 'var(--chart-zero-line)' : 'var(--chart-grid)'}
                strokeWidth={idx === 2 ? '2' : '1'}
                strokeDasharray={idx === 2 ? 'none' : '4 6'}
              />
            ))}

            {data.map((item, idx) => {
              const groupWidth = 1000 / data.length;
              const xStart = idx * groupWidth + groupWidth * 0.15;
              const barCount = Math.max(item.positiveValues.length, item.negativeValues.length);
              const barWidth = (groupWidth * 0.7) / barCount - 2;

              return (
                <g key={idx}>
                  {item.positiveValues.map((val, bIdx) => {
                    const h = (val / 100) * 110;
                    const bx = xStart + bIdx * (barWidth + 2);
                    const by = 120 - h;
                    const c = item.colors?.[bIdx] || defaultPosColors[bIdx % defaultPosColors.length];
                    return (
                      <rect
                        key={`pos-${bIdx}`}
                        x={bx}
                        y={by}
                        width={Math.max(2, barWidth)}
                        height={h}
                        fill={c}
                        className="unooria-dataviz__bar"
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const parentRect = e.currentTarget.closest('.unooria-dataviz-card')?.getBoundingClientRect();
                          if (parentRect) {
                            setTooltip({
                              visible: true,
                              x: rect.left - parentRect.left + rect.width / 2,
                              y: rect.top - parentRect.top,
                              title: item.label,
                              label: `Ganho (+)`,
                              value: `+${val}%`,
                              color: c,
                            });
                          }
                        }}
                      />
                    );
                  })}

                  {item.negativeValues.map((val, bIdx) => {
                    const h = (Math.abs(val) / 100) * 110;
                    const bx = xStart + bIdx * (barWidth + 2);
                    const by = 120;
                    const c = defaultNegColors[bIdx % defaultNegColors.length];
                    return (
                      <rect
                        key={`neg-${bIdx}`}
                        x={bx}
                        y={by}
                        width={Math.max(2, barWidth)}
                        height={h}
                        fill={c}
                        className="unooria-dataviz__bar"
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const parentRect = e.currentTarget.closest('.unooria-dataviz-card')?.getBoundingClientRect();
                          if (parentRect) {
                            setTooltip({
                              visible: true,
                              x: rect.left - parentRect.left + rect.width / 2,
                              y: rect.bottom - parentRect.top + 30,
                              title: item.label,
                              label: `Perda (-)`,
                              value: `-${val}%`,
                              color: c,
                            });
                          }
                        }}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>

          <div className="unooria-dataviz__x-axis">
            {data.map((item, idx) => (
              <span key={idx} style={{ flex: 1, textAlign: 'center' }}>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. Gráficos de Linhas e Área (#5847:2155 / #5838:466)
// ============================================================================
export const LineChart: React.FC<LineChartProps> = ({
  title = 'Title Example',
  subtitle = 'Subtitle Example',
  categories = [],
  series = [],
  isArea = false,
  yAxisLabels = ['100', '75', '50', '25', '0'],
  showTooltip = true,
  theme = 'light',
  className = '',
  style,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  return (
    <div
      className={`unooria-dataviz-card unooria-dataviz-card--theme-${theme} ${className}`.trim()}
      style={style}
      data-theme={theme}
      onMouseLeave={() => setTooltip(null)}
    >
      {showTooltip && <DataVizTooltip tooltip={tooltip} />}

      <div className="unooria-dataviz__header">
        <div className="unooria-dataviz__title-row">
          <h3 className="unooria-dataviz__title">{title}</h3>
        </div>
        <div className="unooria-dataviz__subtitle-row">
          <span className="unooria-dataviz__subtitle">{subtitle}</span>
          <div className="unooria-dataviz__indicators">
            {series.map((s, idx) => (
              <div key={idx} className="unooria-dataviz__indicator">
                <span
                  className="unooria-dataviz__indicator-dot"
                  style={{ backgroundColor: s.color || UNOORIA_DATAVIZ_PALETTE[idx % UNOORIA_DATAVIZ_PALETTE.length] }}
                />
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="unooria-dataviz__chart-area">
        <div className="unooria-dataviz__y-axis">
          {yAxisLabels.map((lbl, idx) => (
            <span key={idx}>{lbl}</span>
          ))}
        </div>

        <div className="unooria-dataviz__plot-container">
          <svg className="unooria-dataviz__svg-plot" viewBox="0 0 1000 240" preserveAspectRatio="none">
            {[0, 60, 120, 180, 240].map((y, idx) => (
              <line
                key={idx}
                x1="0"
                y1={y}
                x2="1000"
                y2={y}
                stroke={idx === 4 ? 'var(--chart-zero-line)' : 'var(--chart-grid)'}
                strokeWidth={idx === 4 ? '1.5' : '1'}
                strokeDasharray={idx === 4 ? 'none' : '4 6'}
              />
            ))}

            {series.map((s, sIdx) => {
              const points = s.data.map((val, idx) => {
                const x = (idx / (categories.length - 1)) * 1000;
                const y = 240 - (val / 100) * 230;
                return `${x},${y}`;
              });
              const pointsStr = points.join(' ');
              const color = s.color || UNOORIA_DATAVIZ_PALETTE[sIdx % UNOORIA_DATAVIZ_PALETTE.length];

              return (
                <g key={sIdx}>
                  {isArea && (
                    <polygon
                      points={`0,240 ${pointsStr} 1000,240`}
                      fill={color}
                      fillOpacity={0.2}
                    />
                  )}
                  <polyline
                    points={pointsStr}
                    fill="none"
                    stroke={color}
                    strokeWidth={s.strokeWidth || 3}
                  />
                  {s.data.map((val, idx) => {
                    const x = (idx / (categories.length - 1)) * 1000;
                    const y = 240 - (val / 100) * 230;
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r={5}
                        fill="#ffffff"
                        stroke={color}
                        strokeWidth={2.5}
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const parentRect = e.currentTarget.closest('.unooria-dataviz-card')?.getBoundingClientRect();
                          if (parentRect) {
                            setTooltip({
                              visible: true,
                              x: rect.left - parentRect.left + rect.width / 2,
                              y: rect.top - parentRect.top,
                              title: categories[idx],
                              label: s.name,
                              value: val,
                              color,
                            });
                          }
                        }}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>

          <div className="unooria-dataviz__x-axis">
            {categories.map((cat, idx) => (
              <span key={idx} style={{ flex: 1, textAlign: 'center' }}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AreaChart: React.FC<LineChartProps> = (props) => <LineChart {...props} isArea />;

// ============================================================================
// 4. Gráficos de Pizza, Donut e Meio Donut 180° (#5847:2374 / #5849:2114)
// ============================================================================
export const PieChart: React.FC<PieChartProps> = ({
  title = 'Title Example',
  subtitle = 'Subtitle Example',
  data = [],
  showTooltip = true,
  theme = 'light',
  className = '',
  style,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const total = data.reduce((acc, d) => acc + d.value, 0) || 1;
  let accumulatedAngle = 0;

  const defaultColors = ['#2F4F7F', '#7FA5E2', '#8FAFE5', '#BDD0EF', '#D3E0F5', '#A4BDE9'];

  return (
    <div
      className={`unooria-dataviz-card unooria-dataviz-card--compact unooria-dataviz-card--theme-${theme} ${className}`.trim()}
      style={style}
      data-theme={theme}
      onMouseLeave={() => setTooltip(null)}
    >
      {showTooltip && <DataVizTooltip tooltip={tooltip} />}

      <div className="unooria-dataviz__header">
        <h3 className="unooria-dataviz__title">{title}</h3>
        <span className="unooria-dataviz__subtitle">{subtitle}</span>
      </div>

      <div className="unooria-dataviz__donut-body">
        <div className="unooria-dataviz__donut-svg-container">
          <svg width="200" height="200" viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
            {data.map((slice, idx) => {
              const portion = slice.value / total;
              const startAngle = accumulatedAngle;
              const endAngle = accumulatedAngle + portion * 2 * Math.PI;
              accumulatedAngle = endAngle;

              const x1 = Math.cos(startAngle);
              const y1 = Math.sin(startAngle);
              const x2 = Math.cos(endAngle);
              const y2 = Math.sin(endAngle);
              const largeArcFlag = portion > 0.5 ? 1 : 0;
              const pathData = `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
              const color = slice.color || defaultColors[idx % defaultColors.length];

              return (
                <path
                  key={idx}
                  d={pathData}
                  fill={color}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const parentRect = e.currentTarget.closest('.unooria-dataviz-card')?.getBoundingClientRect();
                    if (parentRect) {
                      setTooltip({
                        visible: true,
                        x: rect.left - parentRect.left + rect.width / 2,
                        y: rect.top - parentRect.top,
                        title: 'Distribuição',
                        label: slice.label,
                        value: `${slice.value} (${Math.round((slice.value / total) * 100)}%)`,
                        color,
                      });
                    }
                  }}
                />
              );
            })}
          </svg>
        </div>

        <div className="unooria-dataviz__donut-legend">
          {data.map((item, idx) => (
            <div key={idx} className="unooria-dataviz__donut-legend-item">
              <span className="unooria-dataviz__donut-legend-label">
                <span
                  className="unooria-dataviz__indicator-dot"
                  style={{ backgroundColor: item.color || defaultColors[idx % defaultColors.length] }}
                />
                <span>{item.label}</span>
              </span>
              <span className="unooria-dataviz__donut-legend-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DonutChart: React.FC<PieChartProps> = (props) => <PieChart {...props} />;

export const SemiDonutChart: React.FC<SemiDonutChartProps> = ({
  title = 'Title Example',
  subtitle = 'Subtitle Example',
  data = [],
  showTooltip = true,
  theme = 'light',
  className = '',
  style,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const total = data.reduce((acc, d) => acc + d.value, 0) || 1;
  let accumulatedAngle = Math.PI;

  const defaultColors = ['#2F4F7F', '#A4BDE9', '#8FAFE5', '#BDD0EF'];

  return (
    <div
      className={`unooria-dataviz-card unooria-dataviz-card--compact unooria-dataviz-card--theme-${theme} ${className}`.trim()}
      style={style}
      data-theme={theme}
      onMouseLeave={() => setTooltip(null)}
    >
      {showTooltip && <DataVizTooltip tooltip={tooltip} />}

      <div className="unooria-dataviz__header">
        <h3 className="unooria-dataviz__title">{title}</h3>
        <span className="unooria-dataviz__subtitle">{subtitle}</span>
      </div>

      <div className="unooria-dataviz__donut-body">
        <div className="unooria-dataviz__semi-donut-container">
          <svg width="204" height="102" viewBox="0 0 204 102">
            <g transform="translate(102, 102)">
              {data.map((slice, idx) => {
                const portion = slice.value / total;
                const startAngle = accumulatedAngle;
                const endAngle = accumulatedAngle + portion * Math.PI;
                accumulatedAngle = endAngle;

                const rOut = 95;
                const rIn = 60;
                const x1 = rOut * Math.cos(startAngle);
                const y1 = rOut * Math.sin(startAngle);
                const x2 = rOut * Math.cos(endAngle);
                const y2 = rOut * Math.sin(endAngle);

                const x3 = rIn * Math.cos(endAngle);
                const y3 = rIn * Math.sin(endAngle);
                const x4 = rIn * Math.cos(startAngle);
                const y4 = rIn * Math.sin(startAngle);

                const pathData = `M ${x1} ${y1} A ${rOut} ${rOut} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rIn} ${rIn} 0 0 0 ${x4} ${y4} Z`;
                const color = slice.color || defaultColors[idx % defaultColors.length];

                return (
                  <path
                    key={idx}
                    d={pathData}
                    fill={color}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parentRect = e.currentTarget.closest('.unooria-dataviz-card')?.getBoundingClientRect();
                      if (parentRect) {
                        setTooltip({
                          visible: true,
                          x: rect.left - parentRect.left + rect.width / 2,
                          y: rect.top - parentRect.top,
                          title: 'Ocupação',
                          label: slice.label,
                          value: `${slice.value} (${Math.round((slice.value / total) * 100)}%)`,
                          color,
                        });
                      }
                    }}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        <div className="unooria-dataviz__donut-legend">
          {data.map((item, idx) => (
            <div key={idx} className="unooria-dataviz__donut-legend-item">
              <span className="unooria-dataviz__donut-legend-label">
                <span
                  className="unooria-dataviz__indicator-dot"
                  style={{ backgroundColor: item.color || defaultColors[idx % defaultColors.length] }}
                />
                <span>{item.label}</span>
              </span>
              <span className="unooria-dataviz__donut-legend-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. Gráfico Radar Calibrado e 100% Customizável (#5847:2087)
// ============================================================================
export const RadarChart: React.FC<RadarChartProps> = ({
  title = 'Title Example',
  subtitle = 'Subtitle Example',
  axes = ['Curso', 'Curso', 'Curso', 'Curso', 'Curso', 'Curso'],
  series = [
    { name: 'Indicator', values: [85, 90, 70, 85, 65, 95], color: '#2F4F7F' },
    { name: 'Indicator', values: [60, 75, 80, 60, 85, 70], color: '#7FA5E2' },
  ],
  gridLevels = 4,
  maxValue = 100,
  showGridLevelsLabels = false,
  fillOpacity = 0.2,
  strokeWidth = 1.5,
  showDots = true,
  dashedLevelIndex = 1,
  showTooltip = true,
  theme = 'light',
  className = '',
  style,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Normalização dos eixos para rótulos de string
  const axisLabels: string[] = axes.map((a) => (typeof a === 'string' ? a : a.label));
  const n = axisLabels.length || 6;

  // Centro e Raio Máximo no SVG
  const center = 130;
  const maxRadius = 75;

  // Geração dinâmica dos níveis de profundidade da grade
  const levels = Array.from({ length: gridLevels }, (_, i) => (i + 1) / gridLevels);

  return (
    <div
      className={`unooria-dataviz-card unooria-dataviz-card--compact unooria-dataviz-card--theme-${theme} ${className}`.trim()}
      style={style}
      data-theme={theme}
      onMouseLeave={() => setTooltip(null)}
    >
      {showTooltip && <DataVizTooltip tooltip={tooltip} />}

      <div className="unooria-dataviz__header">
        <h3 className="unooria-dataviz__title">{title}</h3>
        <span className="unooria-dataviz__subtitle">{subtitle}</span>
      </div>

      <div className="unooria-dataviz__donut-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 260, height: 260, position: 'relative' }}>
          <svg width="260" height="260" viewBox="0 0 260 260" style={{ overflow: 'visible' }}>
            {/* 1. Polígonos de Grade de Profundidade Customizável */}
            {levels.map((scale, sIdx) => {
              const poly = axisLabels.map((_, i) => {
                const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
                const r = scale * maxRadius;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              }).join(' ');
              const isDashed = sIdx === dashedLevelIndex;

              return (
                <g key={sIdx}>
                  <polygon
                    points={poly}
                    fill="none"
                    stroke="var(--chart-grid)"
                    strokeWidth="1"
                    strokeDasharray={isDashed ? '3 3' : 'none'}
                  />
                  {showGridLevelsLabels && (
                    <text
                      x={center + 4}
                      y={center - scale * maxRadius + 10}
                      fontSize="9px"
                      fill="var(--chart-subtitle)"
                      fontWeight="600"
                    >
                      {Math.round(scale * maxValue)}
                    </text>
                  )}
                </g>
              );
            })}

            {/* 2. Eixos Radiais */}
            {axisLabels.map((_, i) => {
              const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
              const x2 = center + maxRadius * Math.cos(angle);
              const y2 = center + maxRadius * Math.sin(angle);
              return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="var(--chart-grid)" strokeWidth="1" />;
            })}

            {/* 3. Labels das Categorias nas Extremidades dos Eixos (Ex: Curso) */}
            {axisLabels.map((label, i) => {
              const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
              const textR = maxRadius + 20;
              const tx = center + textR * Math.cos(angle);
              const ty = center + textR * Math.sin(angle);

              return (
                <text
                  key={`label-${i}`}
                  x={tx}
                  y={ty + 4}
                  textAnchor="middle"
                  fill="var(--chart-title)"
                  fontSize="12px"
                  fontWeight="600"
                  fontFamily="inherit"
                >
                  {label}
                </text>
              );
            })}

            {/* 4. Polígonos de Dados das Séries */}
            {series.map((s, sIdx) => {
              const points = axisLabels.map((_, i) => {
                const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
                const val = s.values[i] ?? 0;
                const r = (Math.min(maxValue, Math.max(0, val)) / maxValue) * maxRadius;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return `${x},${y}`;
              }).join(' ');
              const color = s.color || (sIdx === 0 ? '#2F4F7F' : '#7FA5E2');
              const op = s.fillOpacity ?? fillOpacity;
              const sw = s.strokeWidth ?? strokeWidth;

              return (
                <g key={sIdx}>
                  <polygon
                    points={points}
                    fill={color}
                    fillOpacity={op}
                    stroke={color}
                    strokeWidth={sw}
                  />
                  {showDots && axisLabels.map((_, i) => {
                    const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
                    const val = s.values[i] ?? 0;
                    const r = (Math.min(maxValue, Math.max(0, val)) / maxValue) * maxRadius;
                    const cx = center + r * Math.cos(angle);
                    const cy = center + r * Math.sin(angle);

                    return (
                      <circle
                        key={`pt-${i}`}
                        cx={cx}
                        cy={cy}
                        r={3.5}
                        fill="#ffffff"
                        stroke={color}
                        strokeWidth={1.5}
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const parentRect = e.currentTarget.closest('.unooria-dataviz-card')?.getBoundingClientRect();
                          if (parentRect) {
                            setTooltip({
                              visible: true,
                              x: rect.left - parentRect.left + rect.width / 2,
                              y: rect.top - parentRect.top,
                              title: axisLabels[i],
                              label: s.name,
                              value: `${val}${maxValue === 100 ? '%' : ''}`,
                              color,
                            });
                          }
                        }}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legenda dos Indicadores */}
        <div className="unooria-dataviz__donut-legend">
          {series.map((item, idx) => (
            <div key={idx} className="unooria-dataviz__donut-legend-item">
              <span className="unooria-dataviz__donut-legend-label">
                <span className="unooria-dataviz__indicator-dot" style={{ backgroundColor: item.color || (idx === 0 ? '#2F4F7F' : '#7FA5E2') }} />
                <span>{item.name}</span>
              </span>
              <span className="unooria-dataviz__donut-legend-value">
                {Math.round(item.values.reduce((a, b) => a + b, 0) / (item.values.length || 1))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. Gráfico de Barras Radiais (#5847:1988)
// ============================================================================
export const RadialBarChart: React.FC<RadialBarChartProps> = ({
  title = 'Gráfico de Barras Radiais',
  subtitle = 'Subtitle Example',
  data = [
    { label: 'Design', value: 85, color: '#2F4F7F' },
    { label: 'Front-end', value: 70, color: '#7FA5E2' },
    { label: 'Back-end', value: 55, color: '#A4BDE9' },
    { label: 'Data Science', value: 40, color: '#D3E0F5' },
  ],
  showTooltip = true,
  theme = 'light',
  className = '',
  style,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  return (
    <div
      className={`unooria-dataviz-card unooria-dataviz-card--compact unooria-dataviz-card--theme-${theme} ${className}`.trim()}
      style={style}
      data-theme={theme}
      onMouseLeave={() => setTooltip(null)}
    >
      {showTooltip && <DataVizTooltip tooltip={tooltip} />}

      <div className="unooria-dataviz__header">
        <h3 className="unooria-dataviz__title">{title}</h3>
        <span className="unooria-dataviz__subtitle">{subtitle}</span>
      </div>

      <div className="unooria-dataviz__donut-body">
        <div className="unooria-dataviz__donut-svg-container">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {data.map((item, idx) => {
              const r = 30 + idx * 16;
              const circumference = 2 * Math.PI * r;
              const offset = circumference - (item.value / 100) * circumference;

              return (
                <g key={idx}>
                  <circle
                    cx="100"
                    cy="100"
                    r={r}
                    fill="none"
                    stroke="var(--chart-grid)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r={r}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parentRect = e.currentTarget.closest('.unooria-dataviz-card')?.getBoundingClientRect();
                      if (parentRect) {
                        setTooltip({
                          visible: true,
                          x: rect.left - parentRect.left + rect.width / 2,
                          y: rect.top - parentRect.top,
                          title: 'Progresso Radial',
                          label: item.label,
                          value: `${item.value}%`,
                          color: item.color,
                        });
                      }
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="unooria-dataviz__donut-legend">
          {data.map((item, idx) => (
            <div key={idx} className="unooria-dataviz__donut-legend-item">
              <span className="unooria-dataviz__donut-legend-label">
                <span
                  className="unooria-dataviz__indicator-dot"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}</span>
              </span>
              <span className="unooria-dataviz__donut-legend-value">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. Painel de Métricas / KPI Card (301x128px #5803:470 / #5812:716)
// ============================================================================
export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  variant = 'up',
  tagText = '+12%',
  theme = 'light',
  className = '',
  style,
}) => {
  return (
    <div
      className={`unooria-metric-card unooria-metric-card--theme-${theme} ${className}`.trim()}
      style={style}
      data-theme={theme}
    >
      <h4 className="unooria-metric-card__title">{title}</h4>
      <div className="unooria-metric-card__bottom-row">
        <span className="unooria-metric-card__value">{value}</span>
        <span className={`unooria-metric-card__tag unooria-metric-card__tag--${variant}`}>
          {variant === 'up' ? <CallMadeIcon /> : <CallReceivedIcon />}
          <span>{tagText}</span>
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// 8. Stacked Progress Bar (#21982:2324)
// ============================================================================
export const StackedProgressBar: React.FC<StackedProgressBarProps> = ({
  title = 'Data viz / Stacked progress bar',
  subtitle = 'Distribuição de solicitações por status',
  segments = [
    { label: 'Abertas', value: 45, amountText: '450', color: '#2F4F7F' },
    { label: 'Em análise', value: 30, amountText: '300', color: '#A4BDE9' },
    { label: 'Concluídas', value: 25, amountText: '250', color: '#8FAFE5' },
  ],
  totalValue = '1.000',
  showTooltip = true,
  theme = 'light',
  className = '',
  style,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const total = segments.reduce((acc, s) => acc + s.value, 0) || 1;

  return (
    <div
      className={`unooria-dataviz-card unooria-stacked-progress-card unooria-dataviz-card--theme-${theme} ${className}`.trim()}
      style={style}
      data-theme={theme}
      onMouseLeave={() => setTooltip(null)}
    >
      {showTooltip && <DataVizTooltip tooltip={tooltip} />}

      <div className="unooria-dataviz__header">
        <div className="unooria-dataviz__title-row">
          <h3 className="unooria-dataviz__title">{title}</h3>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--chart-title)' }}>
            {totalValue}
          </span>
        </div>
        <span className="unooria-dataviz__subtitle">{subtitle}</span>
      </div>

      <div className="unooria-stacked-progress__bar">
        {segments.map((seg, idx) => (
          <div
            key={idx}
            className="unooria-stacked-progress__segment"
            style={{
              width: `${(seg.value / total) * 100}%`,
              backgroundColor: seg.color,
            }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const parentRect = e.currentTarget.closest('.unooria-dataviz-card')?.getBoundingClientRect();
              if (parentRect) {
                setTooltip({
                  visible: true,
                  x: rect.left - parentRect.left + rect.width / 2,
                  y: rect.top - parentRect.top,
                  title: 'Progresso Empilhado',
                  label: seg.label,
                  value: `${seg.amountText || seg.value} (${Math.round((seg.value / total) * 100)}%)`,
                  color: seg.color,
                });
              }
            }}
          />
        ))}
      </div>

      <div className="unooria-stacked-progress__legend">
        {segments.map((seg, idx) => {
          const pct = Math.round((seg.value / total) * 100);
          return (
            <div key={idx} className="unooria-stacked-progress__legend-item">
              <span className="unooria-dataviz__indicator-dot" style={{ backgroundColor: seg.color }} />
              <span>{seg.label}:</span>
              <span className="unooria-stacked-progress__amount">{seg.amountText || seg.value} ({pct}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 9. Circular Progress Bar (48px, 56px, 66px #8806:208)
// ============================================================================
export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  value,
  size = 56,
  strokeWidth = 4,
  showLabel = true,
  color = '#6487C2',
  theme = 'light',
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div
      className={`unooria-circular-progress ${className}`.trim()}
      style={{ width: size, height: size }}
      data-theme={theme}
    >
      <svg className="unooria-circular-progress__svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="unooria-circular-progress__bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="unooria-circular-progress__bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {showLabel && (
        <span className="unooria-circular-progress__label" style={{ fontSize: size <= 48 ? 12 : 14 }}>
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
};

// ============================================================================
// 10. Top Courses / Ranking Card (#26096:16701)
// ============================================================================
export const RankingCard: React.FC<RankingCardProps> = ({
  title = 'Top Cursos Mais Acessados',
  subtitle = 'Ranking semanal por engajamento',
  items = [
    { id: '1', position: 1, title: 'UX Design Avançado', description: 'Design & Pesquisa', tagText: '98 pts', category: 'UX' },
    { id: '2', position: 2, title: 'React & TypeScript Pro', description: 'Desenvolvimento Frontend', tagText: '92 pts', category: 'DEV' },
    { id: '3', position: 3, title: 'Node.js & Microsserviços', description: 'Desenvolvimento Backend', tagText: '88 pts', category: 'DEV' },
    { id: '4', position: 4, title: 'Inteligência Artificial Aplicada', description: 'Data & Analytics', tagText: '85 pts', category: 'AI' },
  ],
  variant = 'default',
  searchPlaceholder = 'Buscar curso ou área...',
  theme = 'light',
  className = '',
  style,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div
      className={`unooria-dataviz-card unooria-ranking-card unooria-dataviz-card--theme-${theme} ${className}`.trim()}
      style={style}
      data-theme={theme}
    >
      <div className="unooria-dataviz__header">
        <h3 className="unooria-dataviz__title">{title}</h3>
        <span className="unooria-dataviz__subtitle">{subtitle}</span>
      </div>

      <div className="unooria-ranking__search">
        <SearchIcon />
        <input
          type="text"
          className="unooria-ranking__search-input"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="unooria-ranking__list">
        {filteredItems.map((item) => (
          <div key={item.id} className="unooria-ranking__item">
            <div className="unooria-ranking__item-left">
              <span className="unooria-ranking__position">#{item.position}</span>
              <div className="unooria-ranking__avatar">
                {item.category || item.title.substring(0, 2).toUpperCase()}
              </div>
              <div className="unooria-ranking__info">
                <span className="unooria-ranking__item-title">{item.title}</span>
                {variant !== 'label-only' && item.description && (
                  <span className="unooria-ranking__item-desc">{item.description}</span>
                )}
              </div>
            </div>

            {variant !== 'describe-only' && item.tagText && (
              <span className="unooria-ranking__tag">{item.tagText}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
