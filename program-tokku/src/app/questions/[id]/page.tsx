"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Star,
  Send,
  Paperclip,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Share2,
  Bookmark,
  Flag,
  Eye,
  MessageCircle,
  Code,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// モックデータ
const questionData = {
  id: "1",
  title: "React useEffectで無限ループが発生してしまいます",
  content: `コンポーネントがマウントされた時にAPIからデータを取得したいのですが、useEffectの中でsetStateを呼ぶと無限ループになってしまいます。

以下のコードを実行すると、コンソールに"fetching..."が延々と出力されます。

何が原因でしょうか？初心者なので基本的なことかもしれませんが、教えていただけると助かります。`,
  code: `useEffect(() => {
  console.log("fetching...");
  fetch("/api/data")
    .then(res => res.json())
    .then(data => setData(data));
})`,
  author: {
    name: "tanaka",
    avatar: "",
    badge: "初心者",
  },
  createdAt: "2024年1月15日 14:32",
  tags: ["React", "バグ"],
  likes: 12,
  views: 156,
  isSolved: false,
};

const answers = [
  {
    id: "a1",
    content: `依存配列（第2引数）を追加してください。

空の配列 \`[]\` を渡すと、マウント時に1回だけ実行されます。

依存配列がない場合、コンポーネントが再レンダリングされるたびにuseEffectが実行されます。setStateを呼ぶと再レンダリングが発生するので、無限ループになってしまうんです。`,
    code: `useEffect(() => {
  fetch("/api/data")
    .then(res => res.json())
    .then(data => setData(data));
}, []); // ← ここに空配列を追加`,
    author: {
      name: "yamada",
      avatar: "",
      badge: "ベテラン",
    },
    createdAt: "1時間前",
    likes: 8,
    isBestAnswer: true,
  },
  {
    id: "a2",
    content: `補足ですが、useCallbackと併用すると、関数の再生成を防ぐこともできます。

また、非同期処理のクリーンアップも忘れずに行うと、メモリリークを防げますよ。

具体的には、AbortControllerを使ってリクエストをキャンセルする方法があります。`,
    author: {
      name: "sato",
      avatar: "",
      badge: "中級者",
    },
    createdAt: "30分前",
    likes: 3,
    isBestAnswer: false,
  },
];

const relatedQuestions = [
  { id: "7", title: "useEffect内でasync/awaitを使う方法", answers: 5 },
  { id: "8", title: "React Hooksの依存配列の正しい使い方", answers: 12 },
  { id: "9", title: "useStateの更新が反映されない", answers: 8 },
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

export default function QuestionDetailPage() {
  const [replyText, setReplyText] = useState("");
  const [liked, setLiked] = useState(false);

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    console.log("Reply submitted:", replyText);
    setReplyText("");
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
            <Link href="/" className="hover:text-foreground transition-colors">
              質問一覧
            </Link>
            <span>/</span>
            <span className="text-foreground">質問詳細</span>
          </div>

          <div className="flex gap-6">
            {/* メインコンテンツ */}
            <div className="flex-1 min-w-0">
              {/* 質問カード */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  {/* ステータスとアクション */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {questionData.isSolved ? (
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
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        共有
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="h-4 w-4 mr-1" />
                        保存
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* タイトル */}
                  <h1 className="mb-4 text-2xl font-bold leading-snug text-foreground">
                    {questionData.title}
                  </h1>

                  {/* メタ情報 */}
                  <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {questionData.views} 回閲覧
                    </span>
                    <span>{questionData.createdAt}</span>
                  </div>

                  {/* 投稿者情報 */}
                  <div className="mb-6 flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={questionData.author.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {questionData.author.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link href={`/users/${questionData.author.name}`} className="font-semibold hover:text-primary transition-colors">
                          @{questionData.author.name}
                        </Link>
                        <Badge
                          variant="outline"
                          className={cn("text-xs", getBadgeColor(questionData.author.badge))}
                        >
                          {questionData.author.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">質問者</p>
                    </div>
                  </div>

                  {/* 質問内容 */}
                  <div className="mb-6 text-foreground leading-relaxed whitespace-pre-wrap">
                    {questionData.content}
                  </div>

                  {/* コードブロック */}
                  {questionData.code && (
                    <div className="mb-6 rounded-lg bg-zinc-900 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                        <span className="flex items-center gap-2 text-sm text-zinc-400">
                          <Code className="h-4 w-4" />
                          JavaScript
                        </span>
                        <Button variant="ghost" size="sm" className="h-7 text-zinc-400 hover:text-zinc-100">
                          コピー
                        </Button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm text-zinc-100">{questionData.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* タグ */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {questionData.tags.map((tag) => (
                      <Link key={tag} href={`/categories/${tag.toLowerCase()}`}>
                        <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>

                  {/* アクションバー */}
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <Button
                      variant="ghost"
                      onClick={() => setLiked(!liked)}
                      className={cn(
                        "gap-2",
                        liked && "text-pink-500 hover:text-pink-600"
                      )}
                    >
                      <Heart className={cn("h-5 w-5", liked && "fill-current")} />
                      <span>{liked ? questionData.likes + 1 : questionData.likes}</span>
                    </Button>
                    <Button variant="ghost" className="gap-2">
                      <MessageCircle className="h-5 w-5" />
                      <span>{answers.length} 件の回答</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 回答セクション */}
              <div className="mb-6">
                <h2 className="mb-4 text-xl font-bold">
                  回答（{answers.length}件）
                </h2>

                <div className="space-y-4">
                  {answers.map((answer) => (
                    <Card
                      key={answer.id}
                      className={cn(
                        answer.isBestAnswer && "border-primary/50 bg-primary/5"
                      )}
                    >
                      <CardContent className="p-6">
                        {/* ベストアンサーバッジ */}
                        {answer.isBestAnswer && (
                          <div className="mb-4">
                            <Badge className="bg-primary text-primary-foreground">
                              <Star className="mr-1 h-3 w-3 fill-current" />
                              ベストアンサー
                            </Badge>
                          </div>
                        )}

                        {/* 回答者情報 */}
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={answer.author.avatar} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {answer.author.name[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <Link href={`/users/${answer.author.name}`} className="font-semibold hover:text-primary transition-colors">
                                  @{answer.author.name}
                                </Link>
                                <Badge
                                  variant="outline"
                                  className={cn("text-xs", getBadgeColor(answer.author.badge))}
                                >
                                  {answer.author.badge}
                                </Badge>
                              </div>
                              <span className="text-sm text-muted-foreground">{answer.createdAt}</span>
                            </div>
                          </div>
                        </div>

                        {/* 回答内容 */}
                        <div className="mb-4 text-foreground leading-relaxed whitespace-pre-wrap">
                          {answer.content}
                        </div>

                        {/* コードブロック（あれば） */}
                        {answer.code && (
                          <div className="mb-4 rounded-lg bg-zinc-900 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                              <span className="flex items-center gap-2 text-sm text-zinc-400">
                                <Code className="h-4 w-4" />
                                JavaScript
                              </span>
                              <Button variant="ghost" size="sm" className="h-7 text-zinc-400 hover:text-zinc-100">
                                コピー
                              </Button>
                            </div>
                            <pre className="p-4 overflow-x-auto">
                              <code className="text-sm text-zinc-100">{answer.code}</code>
                            </pre>
                          </div>
                        )}

                        {/* フッター */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{answer.likes}</span>
                          </Button>
                          {!answer.isBestAnswer && (
                            <Button variant="outline" size="sm">
                              ベストアンサーに選ぶ
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 回答入力エリア */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">回答を投稿する</h3>
                  <Textarea
                    placeholder="あなたの回答を入力してください..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="min-h-[120px] mb-4"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4 mr-1" />
                        ファイル添付
                      </Button>
                      <Button variant="outline" size="sm">
                        <Code className="h-4 w-4 mr-1" />
                        コード挿入
                      </Button>
                    </div>
                    <Button
                      onClick={handleSubmitReply}
                      disabled={!replyText.trim()}
                      className="gap-2"
                    >
                      <Send className="h-4 w-4" />
                      回答を投稿
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* サイドパネル */}
            <div className="hidden xl:block w-80 shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* 質問者カード */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="mb-3 font-semibold text-sm">質問者について</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={questionData.author.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {questionData.author.name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link href={`/users/${questionData.author.name}`} className="font-medium hover:text-primary">
                          @{questionData.author.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">質問数: 5 / 解決率: 80%</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      プロフィールを見る
                    </Button>
                  </CardContent>
                </Card>

                {/* 関連質問 */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="mb-3 font-semibold text-sm">関連する質問</h3>
                    <div className="space-y-3">
                      {relatedQuestions.map((q) => (
                        <Link
                          key={q.id}
                          href={`/questions/${q.id}`}
                          className="block group"
                        >
                          <p className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {q.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {q.answers}件の回答
                          </p>
                        </Link>
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
