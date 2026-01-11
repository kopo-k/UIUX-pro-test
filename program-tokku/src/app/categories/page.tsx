"use client";

import Link from "next/link";
import { TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const languageCategories = [
  { id: "python", name: "Python", icon: "🐍", count: 234, trend: "+12%" },
  { id: "javascript", name: "JavaScript", icon: "JS", count: 189, trend: "+8%" },
  { id: "react", name: "React", icon: "⚛️", count: 156, trend: "+15%" },
  { id: "typescript", name: "TypeScript", icon: "TS", count: 98, trend: "+22%" },
  { id: "nodejs", name: "Node.js", icon: "🟢", count: 87, trend: "+5%" },
  { id: "vue", name: "Vue", icon: "🌿", count: 45, trend: "+3%" },
  { id: "nextjs", name: "Next.js", icon: "▲", count: 67, trend: "+18%" },
  { id: "go", name: "Go", icon: "🔵", count: 34, trend: "+10%" },
  { id: "java", name: "Java", icon: "☕", count: 56, trend: "-2%" },
  { id: "ruby", name: "Ruby", icon: "💎", count: 23, trend: "+1%" },
  { id: "php", name: "PHP", icon: "🐘", count: 45, trend: "-5%" },
  { id: "rust", name: "Rust", icon: "🦀", count: 28, trend: "+25%" },
];

const topicCategories = [
  { id: "bug", name: "バグ", icon: "🐛", count: 312, description: "エラーや不具合の解決" },
  { id: "environment", name: "環境構築", icon: "🔧", count: 145, description: "開発環境のセットアップ" },
  { id: "design", name: "設計", icon: "📐", count: 78, description: "アーキテクチャや設計パターン" },
  { id: "algorithm", name: "アルゴリズム", icon: "🧮", count: 56, description: "ロジックや計算処理" },
  { id: "performance", name: "パフォーマンス", icon: "⚡", count: 42, description: "高速化や最適化" },
  { id: "security", name: "セキュリティ", icon: "🔒", count: 31, description: "脆弱性対策や認証" },
];

const recentQuestions = [
  { id: "1", title: "React useEffectで無限ループが発生", category: "React", time: "5分前" },
  { id: "2", title: "Python仮想環境の作り方", category: "Python", time: "1時間前" },
  { id: "3", title: "TypeScriptの型エラー", category: "TypeScript", time: "3時間前" },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl flex">
        <Sidebar />

        <main className="flex-1 px-6 py-6">
          {/* ページタイトル */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">カテゴリ</h1>
            <p className="text-sm text-muted-foreground mt-1">
              言語やトピックから質問を探す
            </p>
          </div>

          <div className="flex gap-6">
            {/* メインコンテンツ */}
            <div className="flex-1">
              {/* 言語・フレームワーク */}
              <div className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
                  言語・フレームワーク
                  <Badge variant="secondary" className="font-normal">
                    {languageCategories.length}
                  </Badge>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {languageCategories.map((category) => (
                    <Link key={category.id} href={`/categories/${category.id}`}>
                      <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <span className="text-3xl">{category.icon}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                category.trend.startsWith('+')
                                  ? 'text-emerald-600 border-emerald-200'
                                  : 'text-red-600 border-red-200'
                              }`}
                            >
                              {category.trend}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-foreground">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {category.count}件の質問
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* トピック */}
              <div>
                <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
                  トピック
                  <Badge variant="secondary" className="font-normal">
                    {topicCategories.length}
                  </Badge>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topicCategories.map((category) => (
                    <Link key={category.id} href={`/categories/${category.id}`}>
                      <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{category.icon}</span>
                            <div>
                              <h3 className="font-semibold text-foreground">{category.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {category.count}件の質問
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* サイドパネル */}
            <div className="hidden xl:block w-80 shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* トレンドカテゴリ */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="flex items-center gap-2 mb-3 font-semibold text-sm">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      トレンドカテゴリ
                    </h3>
                    <div className="space-y-2">
                      {languageCategories.slice(0, 5).map((category, index) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.id}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {index + 1}
                          </span>
                          <span className="flex-1 text-sm font-medium">
                            {category.name}
                          </span>
                          <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200">
                            {category.trend}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 最新の質問 */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="flex items-center gap-2 mb-3 font-semibold text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      最新の質問
                    </h3>
                    <div className="space-y-3">
                      {recentQuestions.map((q) => (
                        <Link
                          key={q.id}
                          href={`/questions/${q.id}`}
                          className="block group"
                        >
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {q.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {q.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {q.time}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 統計 */}
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="p-4">
                    <h3 className="mb-3 font-semibold text-sm">今日の統計</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">156</div>
                        <div className="text-xs text-muted-foreground">新規質問</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">89</div>
                        <div className="text-xs text-muted-foreground">解決済み</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
