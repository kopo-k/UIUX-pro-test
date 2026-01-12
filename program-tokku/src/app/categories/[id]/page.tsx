"use client";

import Link from "next/link";
import { ArrowLeft, Heart, CheckCircle2, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// モックデータ
const questions = [
  {
    id: "1",
    title: "React useEffectで無限ループが発生してしまいます",
    author: "tanaka",
    createdAt: "2024/01/15 14:30",
    tags: ["React", "バグ"],
    likes: 12,
    answers: 3,
    isSolved: false,
  },
  {
    id: "3",
    title: "React Routerでページ遷移ができない",
    author: "yamada",
    createdAt: "2024/01/14 18:45",
    tags: ["React", "設計"],
    likes: 8,
    answers: 4,
    isSolved: true,
  },
  {
    id: "7",
    title: "Reactでのstate管理について",
    author: "kimura",
    createdAt: "2024/01/13 10:00",
    tags: ["React", "設計"],
    likes: 15,
    answers: 6,
    isSolved: true,
  },
];

export default function CategoryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const categoryName = params.id.charAt(0).toUpperCase() + params.id.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-6">
        {/* 戻るリンク */}
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          カテゴリ一覧に戻る
        </Link>

        <h1 className="text-xl font-bold mb-6">{categoryName} の質問</h1>

        {/* 質問リスト */}
        <div className="space-y-3">
          {questions.map((question) => (
            <Link key={question.id} href={`/questions/${question.id}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  {/* ステータス + タイトル */}
                  <div className="flex items-start gap-2 mb-2">
                    {question.isSolved ? (
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <h3 className="font-medium text-foreground leading-snug">
                      {question.title}
                    </h3>
                  </div>

                  {/* タグ */}
                  <div className="flex flex-wrap gap-1.5 mb-3 ml-7">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* メタ情報 */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground ml-7">
                    <div className="flex items-center gap-2">
                      <span>@{question.author}</span>
                      <span>·</span>
                      <span>{question.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {question.likes}
                      </span>
                      <span>{question.answers}件の回答</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
