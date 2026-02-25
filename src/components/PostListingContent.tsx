import { useState } from "react";
import { Upload, Sparkles, Camera, CheckCircle2, Wand2, FileText, ChevronRight, ImagePlus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import property1 from "@/assets/property-1.jpg";

const steps = [
  { label: "Tải tài liệu", icon: Upload },
  { label: "Xác minh dữ liệu", icon: Sparkles },
  { label: "Hình ảnh & Chi tiết", icon: Camera },
];

const autoFilledFields = [
  { label: "Địa chỉ", value: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP. HCM", key: "address" },
  { label: "Số tờ bản đồ", value: "15", key: "sheet" },
  { label: "Số thửa", value: "42", key: "parcel" },
  { label: "Diện tích", value: "100 m²", key: "area" },
  { label: "Mục đích sử dụng", value: "Đất ở đô thị", key: "purpose" },
];

const PostListingContent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState(false);

  const handleExtract = () => {
    setExtracting(true);
    setTimeout(() => {
      setExtracting(false);
      setExtracted(true);
      setTimeout(() => setCurrentStep(1), 400);
    }, 1800);
  };

  const progressValue = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="flex-1 overflow-y-auto bg-muted/30">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i <= currentStep
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {i < currentStep ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:inline ${
                    i <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
                )}
              </div>
            ))}
          </div>
          <Progress value={progressValue} className="h-1.5" />
        </div>

        {/* Step 1: Document Upload */}
        {currentStep === 0 && (
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm animate-fade-in">
            <h2 className="text-xl font-bold text-foreground mb-1 text-center">
              Tải lên Sổ Hồng/Sổ Đỏ để bắt đầu
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              AI sẽ tự động trích xuất thông tin từ giấy tờ pháp lý
            </p>

            <div
              onClick={() => setUploaded(true)}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                uploaded
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              {uploaded ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">so-hong-bds.pdf</p>
                  <p className="text-xs text-muted-foreground">2.4 MB — Đã tải lên thành công</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-muted flex items-center justify-center">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Kéo thả hoặc nhấn để tải lên
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Hỗ trợ PDF, JPG, PNG — Tối đa 20MB
                  </p>
                </div>
              )}
            </div>

            {uploaded && (
              <div className="mt-6 text-center animate-fade-in">
                {extracting ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      AI đang quét và trích xuất dữ liệu...
                    </div>
                    <Progress value={65} className="h-1.5 max-w-xs mx-auto" />
                  </div>
                ) : extracted ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-success font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    Trích xuất hoàn tất!
                  </div>
                ) : (
                  <Button onClick={handleExtract} className="gap-2">
                    <Wand2 className="w-4 h-4" />
                    Quét dữ liệu tự động
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Verification & Auto-Fill */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-primary/10 border border-primary/20 rounded-xl px-5 py-3 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm font-medium text-foreground">
                ✨ AI đã trích xuất dữ liệu thành công!
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-5">
                Xác minh thông tin trích xuất
              </h3>
              <div className="space-y-4">
                {autoFilledFields.map((field) => (
                  <div key={field.key}>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                      {field.label}
                      <Wand2 className="w-3 h-3 text-primary" />
                    </label>
                    <Input
                      defaultValue={field.value}
                      className="border-primary/30 bg-primary/5 focus:bg-background transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => setCurrentStep(2)} className="gap-2">
                  Tiếp tục
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Media & Final Details */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Hình ảnh thực tế BĐS
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="relative aspect-square rounded-xl overflow-hidden border border-border">
                  <img src={property1} alt="Property" className="w-full h-full object-cover" />
                </div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all"
                  >
                    <ImagePlus className="w-6 h-6 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Thông tin bổ sung
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Giá mong muốn (VND)
                  </label>
                  <Input placeholder="VD: 5,200,000,000" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Mô tả thêm
                  </label>
                  <Textarea
                    placeholder="Mô tả chi tiết về bất động sản: vị trí, tiện ích xung quanh, tình trạng..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <Button className="w-full h-12 text-base font-semibold gap-2 shadow-lg">
              <Send className="w-5 h-5" />
              Gửi Yêu Cầu Thẩm Định
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostListingContent;
