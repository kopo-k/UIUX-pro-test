"use client";

import Link from "next/link";
import {
  Settings,
  Trophy,
  Flame,
  Award,
  CheckCircle2,
  MessageCircle,
  Calendar,
  MapPin,
  LinkIcon,
  Edit,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// モックデータ
const userData = {
  name: "yamada",
  displayName: "山田太郎",
  avatar: "",
  bio: "フロントエンドエンジニア。React/TypeScript が得意です。初心者の質問にも丁寧に回答することを心がけています。",
  location: "東京都",
  website: "https://example.com",
  joinedAt: "2023年6月",
  title: "ベテラン回答者",
  titleIcon: Trophy,
  stats: {
    solvedCount: 47,
    bestAnswerRate: 68,
    weeklyContribution: 12,
    totalAnswers: 124,
    totalQuestions: 8,
  },
  expertTags: [
    { name: "React", isHot: true, count: 45 },
    { name: "TypeScript", isHot: false, count: 32 },
    { name: "Node.js", isHot: false, count: 18 },
    { name: "Next.js", isHot: true, count: 15 },
  ],
  badges: [
    { id: "1", name: "React達人", icon: "🥇", description: "Reactで50問解決" },
    { id: "2", name: "連続回答7日", icon: "🎯", description: "7日連続で回答" },
    { id: "3", name: "初めての解決", icon: "🌟", description: "初めてベストアンサーを獲得" },
    { id: "4", name: "いいね100", icon: "❤️", description: "累計いいね100達成" },
    { id: "5", name: "質問王", icon: "👑", description: "質問が10いいね以上獲得" },
    { id: "6", name: "早起き回答者", icon: "🌅", description: "朝6時前に回答" },
  ],
  recentActivities: [
    { id: "1", type: "solved", title: "useEffectの質問を解決", time: "2時間前", questionId: "1" },
    { id: "2", type: "answer", title: "環境構築の質問に回答", time: "昨日", questionId: "2" },
    { id: "3", type: "answer", title: "TypeScriptの型エラーに回答", time: "2日前", questionId: "3" },
    { id: "4", type: "question", title: "Next.js 14のキャッシュについて質問", time: "3日前", questionId: "10" },
    { id: "5", type: "solved", title: "Dockerの質問を解決", time: "4日前", questionId: "6" },
  ],
};

function getTitleColor(title: string) {
  switch (title) {
    case "ベテラン回答者":
      return "bg-amber-100 text-amber-700 border-amber-300";
    case "中級者":
      return "bg-blue-100 text-blue-700 border-blue-300";
    case "初心者":
      return "bg-emerald-100 text-emerald-700 border-emerald-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
}

export default function ProfilePage() {
  const TitleIcon = userData.titleIcon;

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
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold">{userData.displayName}</h1>
                        <Badge
                          variant="outline"
                          className={`gap-1.5 px-3 py-1 ${getTitleColor(userData.title)}`}
                        >
                          <TitleIcon className="h-4 w-4" />
                          {userData.title}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">@{userData.name}</p>
                      <p className="text-foreground mb-4 max-w-xl">{userData.bio}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {userData.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <LinkIcon className="h-4 w-4" />
                          <a href={userData.website} className="text-primary hover:underline">
                            {userData.website.replace("https://", "")}
                          </a>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {userData.joinedAt}から参加
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Edit className="h-4 w-4 mr-1.5" />
                        プロフィールを編集
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 統計 */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{userData.stats.solvedCount}</div>
                  <div className="text-sm text-muted-foreground">解決数</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">{userData.stats.bestAnswerRate}%</div>
                  <div className="text-sm text-muted-foreground">ベスト率</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">{userData.stats.totalAnswers}</div>
                  <div className="text-sm text-muted-foreground">総回答数</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">{userData.stats.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">総質問数</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{userData.stats.weeklyContribution}</div>
                  <div className="text-sm text-muted-foreground">今週の貢献</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-6">
            {/* メインコンテンツ */}
            <div className="flex-1">
              <Tabs defaultValue="activity" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="activity">活動履歴</TabsTrigger>
                  <TabsTrigger value="answers">回答一覧</TabsTrigger>
                  <TabsTrigger value="questions">質問一覧</TabsTrigger>
                </TabsList>

                <TabsContent value="activity">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-4">最近の活動</h3>
                      <div className="space-y-4">
                        {userData.recentActivities.map((activity) => (
                          <Link
                            key={activity.id}
                            href={`/questions/${activity.questionId}`}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                activity.type === "solved"
                                  ? "bg-primary/10"
                                  : activity.type === "answer"
                                  ? "bg-blue-100"
                                  : "bg-amber-100"
                              }`}
                            >
                              {activity.type === "solved" ? (
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                              ) : activity.type === "answer" ? (
                                <MessageCircle className="h-5 w-5 text-blue-600" />
                              ) : (
                                <MessageCircle className="h-5 w-5 text-amber-600" />
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
                            <Badge variant="secondary" className="shrink-0">
                              {activity.type === "solved" ? "解決" : activity.type === "answer" ? "回答" : "質問"}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="answers">
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      回答一覧がここに表示されます
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="questions">
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      質問一覧がここに表示されます
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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
                    <div className="grid grid-cols-3 gap-2">
                      {userData.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className="flex flex-col items-center p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
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

                {/* ランクアップ進捗 */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-amber-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="h-6 w-6 text-primary" />
                      <div>
                        <p className="text-sm font-medium">次のランクまで</p>
                        <p className="text-xs text-muted-foreground">
                          あと3問解決で「マスター」に昇格
                        </p>
                      </div>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-primary to-amber-500"
                        style={{ width: "94%" }}
                      />
                    </div>
                    <p className="mt-2 text-right text-xs text-muted-foreground">
                      47 / 50
                    </p>
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
