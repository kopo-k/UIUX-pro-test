"use client";

import { use } from "react";
import Link from "next/link";
import { Heart, MessageCircle, CheckCircle2, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// カテゴリ情報
const categoryInfo: { [key: string]: { name: string; icon: string; description: string } } = {
  react: { name: "React", icon: "⚛️", description: "Reactに関する質問" },
  python: { name: "Python", icon: "🐍", description: "Pythonに関する質問" },
  javascript: { name: "JavaScript", icon: "JS", description: "JavaScriptに関する質問" },
  typescript: { name: "TypeScript", icon: "TS", description: "TypeScriptに関する質問" },
  nodejs: { name: "Node.js", icon: "🟢", description: "Node.jsに関する質問" },
  vue: { name: "Vue", icon: "🌿", description: "Vueに関する質問" },
  nextjs: { name: "Next.js", icon: "▲", description: "Next.jsに関する質問" },
  go: { name: "Go", icon: "🔵", description: "Goに関する質問" },
  java: { name: "Java", icon: "☕", description: "Javaに関する質問" },
  ruby: { name: "Ruby", icon: "💎", description: "Rubyに関する質問" },
  php: { name: "PHP", icon: "🐘", description: "PHPに関する質問" },
  rust: { name: "Rust", icon: "🦀", description: "Rustに関する質問" },
  bug: { name: "バグ", icon: "🐛", description: "エラーや不具合の解決" },
  environment: { name: "環境構築", icon: "🔧", description: "開発環境のセットアップ" },
  design: { name: "設計", icon: "📐", description: "アーキテクチャや設計パターン" },
  algorithm: { name: "アルゴリズム", icon: "🧮", description: "ロジックや計算処理" },
  performance: { name: "パフォーマンス", icon: "⚡", description: "高速化や最適化" },
  security: { name: "セキュリティ", icon: "🔒", description: "脆弱性対策や認証" },
};

// モックデータ
const questions = [
  {
    id: "1",
    title: "React useEffectで無限ループが発生してしまいます",
    excerpt: "コンポーネントがマウントされた時にAPIからデータを取得したいのですが、useEffectの中でsetStateを呼ぶと無限ループになってしまいます...",
    author: { name: "tanaka", avatar: "", badge: "初心者" },
    createdAt: "5分前",
    tags: ["React", "バグ"],
    likes: 12,
    answers: 3,
    isSolved: false,
  },
  {
    id: "3",
    title: "React Routerでページ遷移ができない",
    excerpt: "React Router v6を使っているのですが、Linkコンポーネントでページ遷移しようとしてもURLは変わるのに画面が更新されません...",
    author: { name: "yamada", avatar: "", badge: "中級者" },
    createdAt: "3時間前",
    tags: ["React", "設計"],
    likes: 8,
    answers: 4,
    isSolved: true,
  },
  {
    id: "7",
    title: "Reactでのstate管理について",
    excerpt: "大規模なアプリケーションでのstate管理について悩んでいます。Redux、Zustand、Jotaiなど選択肢が多くてどれを使うべきか...",
    author: { name: "kimura", avatar: "", badge: "中級者" },
    createdAt: "昨日",
    tags: ["React", "設計"],
    likes: 15,
    answers: 6,
    isSolved: true,
  },
  {
    id: "8",
    title: "useCallbackとuseMemoの使い分け",
    excerpt: "パフォーマンス最適化のためにuseCallbackとuseMemoを使いたいのですが、どのような場面でどちらを使うべきか判断に迷っています...",
    author: { name: "sato", avatar: "", badge: "初心者" },
    createdAt: "2日前",
    tags: ["React", "パフォーマンス"],
    likes: 22,
    answers: 5,
    isSolved: true,
  },
];

function getBadgeColor(badge: string) {
  switch (badge) {
    case "初心者":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "中級者":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "ベテラン":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const category = categoryInfo[id] || {
    name: id.charAt(0).toUpperCase() + id.slice(1),
    icon: "📁",
    description: "このカテゴリの質問一覧",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl flex">
        <Sidebar />

        <main className="flex-1 px-6 py-6">
          {/* パンくずリスト */}
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-foreground transition-colors">
              カテゴリ
            </Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </div>

          {/* カテゴリヘッダー */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{category.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>
            <Badge variant="secondary" className="mt-2">
              {questions.length}件の質問
            </Badge>
          </div>

          {/* 質問リスト */}
          <div className="space-y-6">
            {questions.map((question) => (
              <Link key={question.id} href={`/questions/${question.id}`} className="block">
                <Card className="transition-all hover:shadow-lg hover:border-primary/30 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      {/* 左側: 統計 */}
                      <div className="hidden sm:flex flex-col items-center gap-2 text-center min-w-[70px]">
                        <div className={cn(
                          "px-3 py-1.5 rounded-lg text-sm font-medium",
                          question.isSolved
                            ? "bg-primary/10 text-primary"
                            : "bg-amber-50 text-amber-600"
                        )}>
                          {question.answers}
                          <div className="text-xs font-normal">回答</div>
                        </div>
                      </div>

                      {/* 右側: コンテンツ */}
                      <div className="flex-1 min-w-0">
                        {/* ステータスバッジ */}
                        <div className="mb-2 flex items-center gap-2">
                          {question.isSolved ? (
                            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              解決済み
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-700">
                              <Clock className="mr-1 h-3 w-3" />
                              回答募集中
                            </Badge>
                          )}
                        </div>

                        {/* タイトル */}
                        <h3 className="mb-2 text-lg font-semibold leading-snug text-foreground hover:text-primary transition-colors">
                          {question.title}
                        </h3>

                        {/* 抜粋 */}
                        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                          {question.excerpt}
                        </p>

                        {/* タグ */}
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {question.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs font-normal hover:bg-secondary/80"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* フッター */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={question.author.avatar} />
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {question.author.name[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              @{question.author.name}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn("text-xs px-1.5 py-0", getBadgeColor(question.author.badge))}
                            >
                              {question.author.badge}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              · {question.createdAt}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {question.likes}
                            </span>
                            <span className="flex items-center gap-1 sm:hidden">
                              <MessageCircle className="h-4 w-4" />
                              {question.answers}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
