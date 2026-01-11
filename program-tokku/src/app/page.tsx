"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, CheckCircle2, Clock, Eye, TrendingUp } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// モックデータ
const questions = [
  {
    id: "1",
    title: "React useEffectで無限ループが発生してしまいます",
    excerpt:
      "コンポーネントがマウントされた時にAPIからデータを取得したいのですが、useEffectの中でsetStateを呼ぶと無限ループになってしまいます...",
    author: { name: "tanaka", avatar: "", badge: "初心者" },
    createdAt: "5分前",
    tags: ["React", "バグ"],
    likes: 12,
    answers: 3,
    views: 156,
    isSolved: false,
  },
  {
    id: "2",
    title: "Python仮想環境の作り方がわかりません",
    excerpt:
      "MacでPythonの開発環境を構築しているのですが、venvとpyenvの違いがわからず、どちらを使うべきか迷っています...",
    author: { name: "suzuki", avatar: "", badge: "初心者" },
    createdAt: "1時間前",
    tags: ["Python", "環境構築"],
    likes: 8,
    answers: 5,
    views: 234,
    isSolved: true,
  },
  {
    id: "3",
    title: "TypeScriptの型エラーが解消できません",
    excerpt:
      "Genericsを使った関数を書いているのですが、「Type 'T' is not assignable to type 'string'」というエラーが出て...",
    author: { name: "yamada", avatar: "", badge: "中級者" },
    createdAt: "3時間前",
    tags: ["TypeScript", "バグ"],
    likes: 15,
    answers: 2,
    views: 89,
    isSolved: false,
  },
  {
    id: "4",
    title: "Gitでコンフリクトが発生した時の対処法",
    excerpt:
      "チーム開発でmainブランチにマージしようとしたらコンフリクトが発生しました。解消方法を教えてください...",
    author: { name: "sato", avatar: "", badge: "初心者" },
    createdAt: "昨日",
    tags: ["Git", "設計"],
    likes: 22,
    answers: 7,
    views: 412,
    isSolved: true,
  },
  {
    id: "5",
    title: "Next.js App RouterでのSSRとSSGの使い分け",
    excerpt:
      "Next.js 14を使っているのですが、どのような場合にSSRを使い、どのような場合にSSGを使うべきか判断に迷っています...",
    author: { name: "kimura", avatar: "", badge: "中級者" },
    createdAt: "2日前",
    tags: ["Next.js", "React", "設計"],
    likes: 35,
    answers: 8,
    views: 567,
    isSolved: true,
  },
  {
    id: "6",
    title: "Docker Composeで複数コンテナの連携がうまくいかない",
    excerpt:
      "フロントエンド、バックエンド、データベースの3つのコンテナを連携させたいのですが、ネットワーク設定でつまづいています...",
    author: { name: "takahashi", avatar: "", badge: "初心者" },
    createdAt: "3日前",
    tags: ["Docker", "環境構築"],
    likes: 18,
    answers: 4,
    views: 298,
    isSolved: false,
  },
];

const trendingQuestions = [
  { id: "5", title: "Next.js App RouterでのSSRとSSGの使い分け", answers: 8 },
  { id: "4", title: "Gitでコンフリクトが発生した時の対処法", answers: 7 },
  { id: "2", title: "Python仮想環境の作り方がわかりません", answers: 5 },
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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredQuestions = questions.filter((q) => {
    if (activeTab === "unsolved") return !q.isSolved;
    if (activeTab === "solved") return q.isSolved;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl flex">
        <Sidebar />

        <main className="flex-1 px-6 py-6">
          {/* ページタイトル */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">質問一覧</h1>
              <p className="text-sm text-muted-foreground mt-1">
                みんなの疑問を解決しよう
              </p>
            </div>
          </div>

          {/* タブフィルター */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">すべて</TabsTrigger>
              <TabsTrigger value="unsolved" className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                未解決
              </TabsTrigger>
              <TabsTrigger value="solved" className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                解決済み
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-6">
            {/* 質問リスト（メイン） */}
            <div className="flex-1 space-y-4">
              {filteredQuestions.map((question) => (
                <Link key={question.id} href={`/questions/${question.id}`}>
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
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {question.views}
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

              {/* ページネーション */}
              <div className="flex justify-center gap-2 pt-4">
                <Button variant="outline" disabled>前へ</Button>
                <Button variant="outline" className="bg-primary/10 border-primary text-primary">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">次へ</Button>
              </div>
            </div>

            {/* サイドパネル（トレンド） */}
            <div className="hidden xl:block w-80 shrink-0">
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <h3 className="flex items-center gap-2 mb-4 font-semibold text-foreground">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    トレンドの質問
                  </h3>
                  <div className="space-y-3">
                    {trendingQuestions.map((q, index) => (
                      <Link
                        key={q.id}
                        href={`/questions/${q.id}`}
                        className="flex items-start gap-3 group"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {q.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {q.answers}件の回答
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
