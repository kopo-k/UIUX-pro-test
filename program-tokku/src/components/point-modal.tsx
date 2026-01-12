"use client";

import { useEffect, useState } from "react";
import { Zap, PartyPopper, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PointModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
  message: string;
}

export function PointModal({ isOpen, onClose, points, message }: PointModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center border-0 bg-gradient-to-br from-amber-50 to-orange-50">
        {/* 紙吹雪エフェクト */}
        {showConfetti && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                }}
              >
                <Star
                  className="h-4 w-4 text-amber-400"
                  style={{
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="py-6">
          {/* アイコン */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg animate-pulse">
                <Zap className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <PartyPopper className="h-8 w-8 text-amber-600" />
              </div>
            </div>
          </div>

          {/* ポイント表示 */}
          <div className="mb-4">
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-2">
              +{points}pt
            </div>
            <p className="text-xl font-bold text-foreground">獲得!</p>
          </div>

          {/* メッセージ */}
          <p className="text-muted-foreground mb-6">{message}</p>

          {/* 閉じるボタン */}
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold"
            size="lg"
          >
            やったね!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
