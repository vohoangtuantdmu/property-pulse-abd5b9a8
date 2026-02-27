import { useState } from "react";
import { Percent, BrainCircuit, RefreshCw, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const SystemParameters = () => {
  const [interestRate, setInterestRate] = useState("8.5");
  const [retraining, setRetraining] = useState(false);

  const handleRetrain = () => {
    setRetraining(true);
    setTimeout(() => setRetraining(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-muted/40 p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Biến số Toàn cục & Mô hình AI</h1>
        <p className="text-sm text-muted-foreground mt-1">Cấu hình tham số tài chính và quản lý mô hình học máy.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Financial Parameters */}
        <Card className="shadow-sm">
          <CardContent className="p-5 space-y-5">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Tham số Tài chính</h3>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-medium text-muted-foreground">
                Lãi suất ngân hàng tham chiếu (Dùng cho module dòng tiền)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                </div>
                <Button className="shrink-0">Cập nhật</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Giá trị hiện tại: <span className="font-semibold text-foreground">{interestRate}%</span> — Áp dụng cho tất cả phân tích dòng tiền mới.
              </p>
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Các tham số khác</p>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
                <span className="text-sm text-foreground">Hệ số điều chỉnh vị trí</span>
                <Badge variant="outline" className="text-xs">1.15</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
                <span className="text-sm text-foreground">Tỷ lệ chiết khấu dòng tiền</span>
                <Badge variant="outline" className="text-xs">12%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Model */}
        <Card className="shadow-sm">
          <CardContent className="p-5 space-y-5">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Huấn luyện lại Mô hình KNN</h3>
            </div>

            <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-foreground">
                  Dữ liệu huấn luyện hiện tại: <span className="font-bold">15,420 giao dịch</span>
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Lần huấn luyện cuối: 20/02/2026</span>
                <span>Độ chính xác: 92.5%</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Dữ liệu mới chưa xử lý: <span className="text-warning font-semibold">320 giao dịch</span></span>
              </div>
            </div>

            <Button
              className="w-full gap-2"
              onClick={handleRetrain}
              disabled={retraining}
            >
              {retraining ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Đang huấn luyện mô hình...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Khởi chạy Retrain với dữ liệu mới
                </>
              )}
            </Button>

            {retraining && (
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs text-primary font-medium">⏳ Đang xử lý 320 giao dịch mới vào mô hình KNN...</p>
              </div>
            )}

            <div className="border-t border-border pt-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Lịch sử huấn luyện</p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>20/02/2026 — 15,100 giao dịch</span>
                  <span className="text-success font-medium">92.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>05/02/2026 — 14,800 giao dịch</span>
                  <span className="text-success font-medium">91.8%</span>
                </div>
                <div className="flex justify-between">
                  <span>20/01/2026 — 14,200 giao dịch</span>
                  <span className="text-warning font-medium">90.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemParameters;
