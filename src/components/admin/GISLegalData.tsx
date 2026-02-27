import { Upload, Layers, FileText, Plus, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const activeLayers = [
  { name: "Bản đồ ODT Phường Phú Thọ", updated: "Cập nhật 02/2026", status: "active" },
  { name: "Quy hoạch sử dụng đất Quận 1", updated: "Cập nhật 01/2026", status: "active" },
  { name: "Bản đồ giao thông TP. Thủ Đức", updated: "Cập nhật 12/2025", status: "active" },
];

const legalDocs = [
  { name: "Thông tư 36/2025/TT-BTC - Định giá đất", date: "15/01/2026" },
  { name: "Quyết định 120/QĐ-UBND - Quy hoạch SDĐ 2026", date: "08/02/2026" },
  { name: "Nghị định 44/2014/NĐ-CP - Phương pháp định giá", date: "10/06/2014" },
];

const GISLegalData = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-muted/40 p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Cập nhật Dữ liệu GIS & Pháp lý</h1>
        <p className="text-sm text-muted-foreground mt-1">Quản lý lớp bản đồ quy hoạch và cơ sở dữ liệu pháp luật.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* GIS Map Layers */}
        <Card className="shadow-sm">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Quản lý Lớp Bản đồ Quy hoạch (PostGIS)</h3>
            </div>

            {/* Upload zone */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">Kéo thả file để cập nhật bản đồ</p>
              <p className="text-xs text-muted-foreground mt-1">
                Hỗ trợ: .geojson, .shp, .kml
              </p>
              <Button variant="outline" size="sm" className="mt-3 text-xs">
                Chọn file từ máy tính
              </Button>
            </div>

            {/* Active layers */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Lớp bản đồ đang hoạt động</p>
              <div className="space-y-2">
                {activeLayers.map((layer) => (
                  <div key={layer.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{layer.name}</p>
                        <p className="text-xs text-muted-foreground">{layer.updated}</p>
                      </div>
                    </div>
                    <Badge className="text-[10px] bg-success/15 text-success border-success/30">Active</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Documents */}
        <Card className="shadow-sm">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Cơ sở Dữ liệu Pháp luật</h3>
              </div>
              <Button size="sm" className="gap-1.5 text-xs h-8">
                <Plus className="w-3.5 h-3.5" />
                Upload Quyết định/Thông tư mới (PDF)
              </Button>
            </div>

            <div className="space-y-2">
              {legalDocs.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">Ngày ban hành: {doc.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">Xem</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GISLegalData;
