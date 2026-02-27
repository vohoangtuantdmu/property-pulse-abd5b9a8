import { useState } from "react";
import { Download, ShieldCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import property1 from "@/assets/property-1.jpg";
import ConsultationBuilder, { type ReportSettings } from "./ConsultationBuilder";

const priceHistory = [
  { month: "T3/25", price: 52 },
  { month: "T4/25", price: 53.5 },
  { month: "T5/25", price: 54 },
  { month: "T6/25", price: 53 },
  { month: "T7/25", price: 55 },
  { month: "T8/25", price: 56.2 },
  { month: "T9/25", price: 55.8 },
  { month: "T10/25", price: 57 },
  { month: "T11/25", price: 56.5 },
  { month: "T12/25", price: 57.8 },
  { month: "T1/26", price: 58.5 },
  { month: "T2/26", price: 57.1 },
];

const comparables = [
  { address: "120 Lê Hồng Phong, Phú Hòa", area: "115 m²", price: "6.2 Tỷ", perM2: "53.9 tr/m²" },
  { address: "45 Yersin, Phú Cường", area: "130 m²", price: "7.4 Tỷ", perM2: "56.9 tr/m²" },
  { address: "88 CMT8, Phú Hòa", area: "100 m²", price: "5.8 Tỷ", perM2: "58.0 tr/m²" },
];

const today = new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

const defaultSettings: ReportSettings = {
  showGISMap: true,
  showComparables: true,
  hideOwnerInfo: false,
  loanRatio: 50,
  loanYears: 15,
  brokerComment:
    "Bất động sản có tính thanh khoản cao, pháp lý ODT an toàn. Phù hợp mua để ở hoặc cho thuê dài hạn. Định giá AI hiện đang thấp hơn giá chào bán 5%, có thể thương lượng thêm.",
};

function buildLoanTable(loanRatio: number, loanYears: number) {
  const propertyValue = 6850;
  const loanAmount = Math.round(propertyValue * loanRatio / 100);
  const annualRate = 0.085;
  const rows = [];
  let balance = loanAmount;
  const yearsToShow = Math.min(loanYears, 3);
  const annualPrincipal = Math.round(loanAmount / loanYears);

  for (let y = 1; y <= yearsToShow; y++) {
    const interest = Math.round(balance * annualRate);
    const payment = annualPrincipal + interest;
    const closing = balance - annualPrincipal;
    rows.push({ year: y, opening: balance, payment, closing: Math.max(closing, 0) });
    balance = Math.max(closing, 0);
  }
  return { rows, loanAmount, annualRate };
}

const ReportContent = () => {
  const [settings, setSettings] = useState<ReportSettings>(defaultSettings);
  const [flashSection, setFlashSection] = useState<string | null>(null);

  const handleChange = (newSettings: ReportSettings) => {
    // Detect which section changed for flash effect
    if (newSettings.loanRatio !== settings.loanRatio || newSettings.loanYears !== settings.loanYears) {
      triggerFlash("finance");
    }
    if (newSettings.showGISMap !== settings.showGISMap) triggerFlash("gis");
    if (newSettings.showComparables !== settings.showComparables) triggerFlash("comparables");
    if (newSettings.brokerComment !== settings.brokerComment) triggerFlash("comment");
    setSettings(newSettings);
  };

  const triggerFlash = (section: string) => {
    setFlashSection(section);
    setTimeout(() => setFlashSection(null), 600);
  };

  const { rows: loanRows, loanAmount } = buildLoanTable(settings.loanRatio, settings.loanYears);

  return (
    <div className="flex-1 flex min-h-0">
      {/* Left Panel: Builder (40%) */}
      <div className="w-[40%] shrink-0">
        <ConsultationBuilder settings={settings} onChange={handleChange} />
      </div>

      {/* Right Panel: Live Preview (60%) */}
      <div className="flex-1 flex flex-col min-h-0 bg-muted/40">
        <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h2 className="text-sm font-bold text-foreground">Xem trước trực tiếp</h2>
          </div>
          <span className="text-[10px] text-muted-foreground">Báo cáo cập nhật theo thời gian thực</span>
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-4 flex justify-center">
          <div className="w-[794px] bg-white rounded-sm shadow-xl border border-border/40" style={{ minHeight: 1100 }}>
            {/* Letterhead */}
            <div className="px-12 pt-10 pb-6 border-b-2" style={{ borderColor: "hsl(215, 60%, 22%)" }}>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-extrabold tracking-tight" style={{ color: "hsl(215, 60%, 22%)" }}>
                    BÁO CÁO THẨM ĐỊNH
                  </h1>
                  <h1 className="text-xl font-extrabold tracking-tight" style={{ color: "hsl(215, 60%, 22%)" }}>
                    BẤT ĐỘNG SẢN AI
                  </h1>
                  <div className="mt-2 h-1 w-16 rounded-full" style={{ background: "hsl(38, 90%, 50%)" }} />
                </div>
                <div className="text-right text-xs leading-relaxed" style={{ color: "hsl(215, 20%, 45%)" }}>
                  <p className="font-semibold" style={{ color: "hsl(215, 60%, 22%)" }}>Đơn vị thực hiện</p>
                  <p>Nhóm Hoàng Tuấn, Tuấn Kiệt,</p>
                  <p>Minh Quân, Minh Nhật, Quốc Thái</p>
                  <p className="mt-1.5 font-medium">Ngày: {today}</p>
                </div>
              </div>
            </div>

            <div className="px-12 py-8 space-y-8">
              {/* Section 1: Property Overview */}
              <section>
                <SectionTitle number="01" title="Tổng quan Tài sản" />
                <div className="grid grid-cols-2 gap-5 mt-4">
                  <div className="rounded-lg overflow-hidden border" style={{ borderColor: "hsl(215, 20%, 88%)" }}>
                    <img src={property1} alt="Property" className="w-full h-44 object-cover" />
                  </div>
                  <div className="space-y-3 py-1">
                    <InfoLine label="Địa chỉ" value="Hẻm xe hơi đường Lê Hồng Phong, P. Phú Hòa, TP. Thủ Dầu Một" />
                    <InfoLine label="Diện tích" value="120 m²" />
                    <InfoLine label="Loại hình" value="Nhà phố" />
                    {!settings.hideOwnerInfo && (
                      <InfoLine label="Chủ sở hữu" value="Nguyễn Văn An" />
                    )}
                    <div className="flex items-center gap-2 pt-1">
                      <ShieldCheck className="w-4 h-4" style={{ color: "hsl(145, 60%, 40%)" }} />
                      <span className="text-xs font-bold" style={{ color: "hsl(145, 60%, 40%)" }}>
                        Pháp lý: Đất ở đô thị (ODT) — An Toàn
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: AI Valuation */}
              <section>
                <SectionTitle number="02" title="Kết quả Định giá AI" />
                <div className="mt-4 rounded-xl p-5 text-center" style={{ background: "hsl(215, 60%, 96%)", border: "1px solid hsl(215, 40%, 88%)" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "hsl(215, 30%, 50%)" }}>
                    Giá trị ước tính
                  </p>
                  <p className="text-4xl font-extrabold tracking-tight" style={{ color: "hsl(215, 60%, 22%)" }}>
                    6.85 <span className="text-lg font-bold">Tỷ VND</span>
                  </p>
                  <p className="text-[11px] mt-2" style={{ color: "hsl(215, 20%, 50%)" }}>
                    Định giá tự động dựa trên mô hình K-Nearest Neighbors (KNN) & đặc trưng không gian (PostGIS).
                  </p>
                  <p className="text-[11px]" style={{ color: "hsl(215, 20%, 50%)" }}>
                    Độ chính xác: 92% · Biên độ: ± 200 Triệu
                  </p>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-semibold mb-3" style={{ color: "hsl(215, 60%, 22%)" }}>
                    Lịch sử biến động giá khu vực (12 tháng qua) — triệu/m²
                  </p>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={priceHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 90%)" />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(215, 20%, 50%)" }} />
                        <YAxis domain={[50, 60]} tick={{ fontSize: 10, fill: "hsl(215, 20%, 50%)" }} />
                        <Tooltip
                          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(215, 20%, 88%)" }}
                          formatter={(v: number) => [`${v} tr/m²`, "Giá TB"]}
                        />
                        <Line type="monotone" dataKey="price" stroke="hsl(38, 90%, 50%)" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(38, 90%, 50%)" }} activeDot={{ r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              {/* Section 2b: KNN Comparables (toggle) */}
              {settings.showComparables && (
                <section className={`transition-opacity duration-500 ${flashSection === "comparables" ? "opacity-50" : "opacity-100"}`}>
                  <SectionTitle number="02b" title="Danh sách BĐS So sánh (KNN Comparables)" />
                  <div className="mt-4 rounded-lg overflow-hidden border" style={{ borderColor: "hsl(215, 20%, 88%)" }}>
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ background: "hsl(215, 50%, 95%)" }}>
                          <th className="text-left py-2 px-3 font-semibold" style={{ color: "hsl(215, 60%, 22%)" }}>Địa chỉ</th>
                          <th className="text-right py-2 px-3 font-semibold" style={{ color: "hsl(215, 60%, 22%)" }}>Diện tích</th>
                          <th className="text-right py-2 px-3 font-semibold" style={{ color: "hsl(215, 60%, 22%)" }}>Giá bán</th>
                          <th className="text-right py-2 px-3 font-semibold" style={{ color: "hsl(215, 60%, 22%)" }}>Giá/m²</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparables.map((c, i) => (
                          <tr key={i} style={{ background: i % 2 === 0 ? "white" : "hsl(215, 30%, 97%)" }}>
                            <td className="py-2 px-3" style={{ color: "hsl(215, 20%, 40%)" }}>{c.address}</td>
                            <td className="py-2 px-3 text-right" style={{ color: "hsl(215, 20%, 40%)" }}>{c.area}</td>
                            <td className="py-2 px-3 text-right font-semibold" style={{ color: "hsl(215, 60%, 22%)" }}>{c.price}</td>
                            <td className="py-2 px-3 text-right" style={{ color: "hsl(38, 80%, 45%)" }}>{c.perM2}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Section 3: GIS Map (toggle) */}
              {settings.showGISMap && (
                <section className={`transition-opacity duration-500 ${flashSection === "gis" ? "opacity-50" : "opacity-100"}`}>
                  <SectionTitle number="03" title="Tóm tắt Pháp lý & Không gian" />
                  <div className="mt-4 rounded-xl overflow-hidden border" style={{ borderColor: "hsl(215, 20%, 88%)" }}>
                    <div className="relative h-40 w-full" style={{ background: "hsl(215, 30%, 94%)" }}>
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160">
                        <line x1="0" y1="80" x2="400" y2="80" stroke="hsl(215, 20%, 82%)" strokeWidth="1" />
                        <line x1="200" y1="0" x2="200" y2="160" stroke="hsl(215, 20%, 82%)" strokeWidth="1" />
                        <line x1="100" y1="0" x2="100" y2="160" stroke="hsl(215, 20%, 88%)" strokeWidth="0.5" />
                        <line x1="300" y1="0" x2="300" y2="160" stroke="hsl(215, 20%, 88%)" strokeWidth="0.5" />
                        <polygon points="140,30 260,25 280,75 250,120 130,110" fill="hsl(350, 70%, 65%)" fillOpacity="0.35" stroke="hsl(350, 70%, 55%)" strokeWidth="1.5" />
                        <polygon points="30,90 120,85 125,140 40,145" fill="hsl(130, 50%, 55%)" fillOpacity="0.3" stroke="hsl(130, 50%, 45%)" strokeWidth="1" />
                        <circle cx="200" cy="70" r="5" fill="hsl(38, 90%, 50%)" stroke="white" strokeWidth="2" />
                        <circle cx="200" cy="70" r="10" fill="none" stroke="hsl(38, 90%, 50%)" strokeWidth="1" strokeDasharray="3 2" />
                        <text x="215" y="68" fontSize="9" fill="hsl(215, 60%, 22%)" fontWeight="bold">BĐS Mục tiêu</text>
                        <text x="145" y="55" fontSize="8" fill="hsl(350, 60%, 45%)" fontWeight="600">ODT</text>
                        <text x="55" y="118" fontSize="8" fill="hsl(130, 40%, 35%)" fontWeight="600">CLN</text>
                      </svg>
                    </div>
                    <div className="px-4 py-3 flex items-center gap-2 text-xs font-medium" style={{ color: "hsl(145, 60%, 35%)", background: "hsl(145, 50%, 96%)" }}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      BĐS nằm trong vùng Đất ở đô thị (ODT) — Không vi phạm quy hoạch
                    </div>
                  </div>
                </section>
              )}

              {/* Section 4: Financial Cash Flow (dynamic) */}
              <section className={`pb-2 transition-opacity duration-500 ${flashSection === "finance" ? "opacity-50" : "opacity-100"}`}>
                <SectionTitle number="04" title="Dự toán Tài chính (Dư nợ giảm dần)" />
                <p className="text-[11px] mt-2 mb-4" style={{ color: "hsl(215, 20%, 50%)" }}>
                  Khoản vay {settings.loanRatio}% giá trị BĐS ({loanAmount.toLocaleString()} Triệu) · Lãi suất 8.5%/năm · Kỳ hạn {settings.loanYears} năm
                </p>
                <div className="rounded-lg overflow-hidden border" style={{ borderColor: "hsl(215, 20%, 88%)" }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: "hsl(215, 60%, 22%)", color: "white" }}>
                        <th className="text-left py-2.5 px-4 font-semibold">Kỳ thanh toán (Năm)</th>
                        <th className="text-right py-2.5 px-4 font-semibold">Dư nợ đầu kỳ</th>
                        <th className="text-right py-2.5 px-4 font-semibold">Gốc + Lãi phải trả</th>
                        <th className="text-right py-2.5 px-4 font-semibold">Dư nợ cuối kỳ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanRows.map((row, i) => (
                        <tr key={row.year} style={{ background: i % 2 === 0 ? "white" : "hsl(215, 30%, 97%)" }}>
                          <td className="py-2.5 px-4 font-medium" style={{ color: "hsl(215, 60%, 22%)" }}>Năm {row.year}</td>
                          <td className="py-2.5 px-4 text-right" style={{ color: "hsl(215, 20%, 40%)" }}>{row.opening.toLocaleString()} Triệu</td>
                          <td className="py-2.5 px-4 text-right font-semibold" style={{ color: "hsl(38, 80%, 45%)" }}>{row.payment.toLocaleString()} Triệu</td>
                          <td className="py-2.5 px-4 text-right" style={{ color: "hsl(215, 20%, 40%)" }}>{row.closing.toLocaleString()} Triệu</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Broker Comment (dynamic) */}
              {settings.brokerComment.trim() && (
                <section className={`pb-4 transition-opacity duration-500 ${flashSection === "comment" ? "opacity-50" : "opacity-100"}`}>
                  <SectionTitle number="05" title="Nhận xét Chuyên viên" />
                  <div className="mt-4 rounded-lg p-4 border-l-4" style={{ borderColor: "hsl(38, 90%, 50%)", background: "hsl(38, 90%, 97%)" }}>
                    <p className="text-xs leading-relaxed italic" style={{ color: "hsl(215, 30%, 30%)" }}>
                      "{settings.brokerComment}"
                    </p>
                    <p className="text-[10px] mt-2 font-medium" style={{ color: "hsl(215, 20%, 55%)" }}>
                      — Chuyên viên Hoàng Tuấn · {today}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Footer */}
            <div className="px-12 py-4 border-t text-center" style={{ borderColor: "hsl(215, 20%, 88%)" }}>
              <p className="text-[10px]" style={{ color: "hsl(215, 20%, 60%)" }}>
                Báo cáo được tạo tự động bởi RealDSS — Hệ thống Hỗ trợ Quyết định Bất động sản AI · © 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "hsl(38, 90%, 50%)", color: "hsl(215, 60%, 15%)" }}>
        {number}
      </span>
      <h2 className="text-sm font-bold" style={{ color: "hsl(215, 60%, 22%)" }}>{title}</h2>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "hsl(215, 20%, 55%)" }}>{label}</p>
      <p className="text-xs font-medium mt-0.5" style={{ color: "hsl(215, 60%, 22%)" }}>{value}</p>
    </div>
  );
}

export default ReportContent;
