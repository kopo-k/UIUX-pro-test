"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderOpen,
  Trophy,
  User,
  TrendingUp,
  Tag,
  HelpCircle,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const mainNavItems = [
  { href: "/", icon: Home, label: "ホーム" },
  { href: "/categories", icon: FolderOpen, label: "カテゴリ" },
  { href: "/ranking", icon: Trophy, label: "ランキング" },
  { href: "/profile", icon: User, label: "マイページ" },
];

const popularTags = [
  { name: "React", count: 156, isHot: true },
  { name: "Python", count: 234, isHot: true },
  { name: "TypeScript", count: 98, isHot: false },
  { name: "JavaScript", count: 189, isHot: false },
  { name: "Node.js", count: 87, isHot: false },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r bg-white h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* メインナビゲーション */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 区切り線 */}
        <div className="border-t" />

        {/* 人気のタグ */}
        <div>
          <h3 className="flex items-center gap-2 px-3 mb-3 text-sm font-semibold text-foreground">
            <Tag className="h-4 w-4" />
            人気のタグ
          </h3>
          <div className="space-y-1">
            {popularTags.map((tag) => (
              <Link
                key={tag.name}
                href={`/categories/${tag.name.toLowerCase()}`}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <span className="flex items-center gap-2">
                  {tag.name}
                  {tag.isHot && <Flame className="h-3.5 w-3.5 text-orange-500" />}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {tag.count}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t" />

        {/* 統計カード */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">今日の統計</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-xs text-muted-foreground">新規質問</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">67</div>
                <div className="text-xs text-muted-foreground">解決済み</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ヘルプリンク */}
        <Link
          href="/help"
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <HelpCircle className="h-4 w-4" />
          ヘルプ・ガイド
        </Link>
      </div>
    </aside>
  );
}
