"use client";

import Link from "next/link";
import {
  Flame,
  Award,
  CheckCircle2,
  MessageCircle,
  Zap,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// ランク判定関数
function getRank(points: number) {
  if (points >= 1000) return { name: "ウィザード", icon: "🧙", color: "bg-purple-100 text-purple-700 border-purple-300" };
  if (points >= 500) return { name: "デベロッパー", icon: "💻", color: "bg-blue-100 text-blue-700 border-blue-300" };
  return { name: "ビギナー", icon: "🌱", color: "bg-emerald-100 text-emerald-700 border-emerald-300" };
}

// 次のランクまでの情報
function getNextRank(points: number) {
  if (points >= 1000) return null; // 最高ランク
  if (points >= 500) return { name: "ウィザード", required: 1000, icon: "🧙" };
  return { name: "デベロッパー", required: 500, icon: "💻" };
}

// モックデータ
const userData = {
  name: "yamada",
  displayName: "山田太郎",
  avatar: "",
  points: 470, // 現在のポイント
  stats: {
    questionCount: 8,
    answerCount: 25,
    bestAnswerCount: 12,
    empathyReceived: 35,
  },
  expertTags: [
    { name: "React", isHot: true, count: 45 },
    { name: "TypeScript", isHot: false, count: 32 },
    { name: "Node.js", isHot: false, count: 18 },
    { name: "Next.js", isHot: true, count: 15 },
  ],
  badges: [
    { id: "1", name: "環境構築職人", icon: "🔧", description: "環境構築タグで10件解決" },
    { id: "2", name: "今週のヒーロー", icon: "🦸", description: "1週間で5件以上解決" },
    { id: "3", name: "初めての解決", icon: "🌟", description: "初めてベストアンサーを獲得" },
    { id: "4", name: "いいね100", icon: "❤️", description: "累計いいね100達成" },
  ],
  recentActivities: [
    { id: "1", type: "best", title: "useEffectの質問でベストアンサー獲得", time: "2時間前", points: 50, questionId: "1" },
    { id: "2", type: "answer", title: "環境構築の質問に回答", time: "昨日", points: 10, questionId: "2" },
    { id: "3", type: "empathy", title: "共感を5件もらいました", time: "2日前", points: 10, questionId: "3" },
    { id: "4", type: "question", title: "Next.js 14のキャッシュについて質問", time: "3日前", points: 5, questionId: "10" },
    { id: "5", type: "best", title: "Dockerの質問でベストアンサー獲得", time: "4日前", points: 50, questionId: "6" },
  ],
};

export default function ProfilePage() {
  const rank = getRank(userData.points);
  const nextRank = getNextRank(userData.points);
  const progress = nextRank ? (userData.points / nextRank.required) * 100 : 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl flex">
        <Sidebar />

        <main className="flex-1 px-6 py-6">
          {/* プロフィールヘッダー */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* アバター */}
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-32 w-32 border-4 border-primary/20">
                    <AvatarImage src={userData.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                      {userData.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* プロフィール情報 */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">{userData.displayName}</h1>
                    <Badge
                      variant="outline"
                      className={`gap-1.5 px-3 py-1 ${rank.color}`}
                    >
                      <span>{rank.icon}</span>
                      {rank.name}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">@{userData.name}</p>

                  {/* ポイント表示 */}
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-6 w-6 text-amber-500" />
                    <span className="text-3xl font-bold text-foreground">{userData.points}</span>
                    <span className="text-lg text-muted-foreground">pt</span>
                  </div>

                  {/* ランクアップ進捗 */}
                  {nextRank && (
                    <div className="max-w-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">次のランク: {nextRank.icon} {nextRank.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{userData.points} / {nextRank.required}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-amber-500 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        あと{nextRank.required - userData.points}ptで「{nextRank.name}」に昇格！
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ポイント内訳 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-foreground">{userData.stats.questionCount}</div>
                  <div className="text-xs text-muted-foreground">質問 (+5pt)</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-foreground">{userData.stats.answerCount}</div>
                  <div className="text-xs text-muted-foreground">回答 (+10pt)</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-primary/10">
                  <div className="text-2xl font-bold text-primary">{userData.stats.bestAnswerCount}</div>
                  <div className="text-xs text-muted-foreground">ベストアンサー (+50pt)</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-foreground">{userData.stats.empathyReceived}</div>
                  <div className="text-xs text-muted-foreground">共感された (+2pt)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-6">
            {/* メインコンテンツ */}
            <div className="flex-1">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    ポイント獲得履歴
                  </h3>
                  <div className="space-y-4">
                    {userData.recentActivities.map((activity) => (
                      <Link
                        key={activity.id}
                        href={`/questions/${activity.questionId}`}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                            activity.type === "best"
                              ? "bg-amber-100"
                              : activity.type === "answer"
                              ? "bg-blue-100"
                              : activity.type === "empathy"
                              ? "bg-pink-100"
                              : "bg-emerald-100"
                          }`}
                        >
                          {activity.type === "best" ? (
                            <CheckCircle2 className="h-5 w-5 text-amber-600" />
                          ) : activity.type === "answer" ? (
                            <MessageCircle className="h-5 w-5 text-blue-600" />
                          ) : activity.type === "empathy" ? (
                            <span className="text-lg">❤️</span>
                          ) : (
                            <span className="text-lg">❓</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">
                            {activity.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                        <Badge className="shrink-0 bg-primary/10 text-primary border-0">
                          +{activity.points}pt
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* サイドパネル */}
            <div className="hidden xl:block w-80 shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* 得意タグ */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 text-sm">得意タグ</h3>
                    <div className="space-y-2">
                      {userData.expertTags.map((tag) => (
                        <Link
                          key={tag.name}
                          href={`/categories/${tag.name.toLowerCase()}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            {tag.name}
                            {tag.isHot && <Flame className="h-3.5 w-3.5 text-orange-500" />}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {tag.count}問
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 獲得バッジ */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 text-sm">獲得バッジ</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {userData.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className="flex flex-col items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                          title={badge.description}
                        >
                          <span className="text-2xl mb-1">{badge.icon}</span>
                          <span className="text-[10px] text-center text-muted-foreground leading-tight">
                            {badge.name}
                          </span>
                        </div>
                      ))}
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
