"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Image as ImageIcon,
  Code,
  Lightbulb,
  X,
  FileText,
  HelpCircle,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PointModal } from "@/components/point-modal";
import { cn } from "@/lib/utils";

const languageTags = ["Python", "JavaScript", "TypeScript", "React", "Node.js", "Vue", "Go", "Java", "Ruby", "PHP"];
const categoryTags = ["バグ", "環境構築", "設計", "アルゴリズム", "パフォーマンス", "セキュリティ", "その他"];

export default function NewQuestionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showPointModal, setShowPointModal] = useState(false);

  const toggleLanguage = (tag: string) => {
    if (selectedLanguages.includes(tag)) {
      setSelectedLanguages(selectedLanguages.filter((t) => t !== tag));
    } else {
      setSelectedLanguages([...selectedLanguages, tag]);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    console.log("Submit:", { title, content, selectedLanguages, selectedCategory });

    // ポイント獲得モーダルを表示
    setShowPointModal(true);
  };

  const handleModalClose = () => {
    setShowPointModal(false);
    router.push("/");
  };

  const isValid = title.trim() && content.trim() && selectedLanguages.length > 0;

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
            <span className="text-foreground">質問を投稿</span>
          </div>

          <div className="flex gap-6">
            {/* メインコンテンツ */}
            <div className="flex-1 max-w-3xl">
              {/* ページタイトル */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">質問を投稿する</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  困っていることを詳しく書いて、コミュニティに質問しましょう
                </p>
              </div>

              {/* 励ましメッセージ */}
              <Card className="mb-6 border-primary/20 bg-primary/5">
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">初めての質問、応援します</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      どんな質問でも大丈夫です。みんな最初は初心者でした。丁寧に回答してもらえるコミュニティです。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 質問フォーム */}
              <Card>
                <CardContent className="p-6 space-y-6">
                  {/* タイトル */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-base font-semibold">
                      タイトル
                      <span className="ml-1 text-destructive">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      困っていることを一言で表現してください
                    </p>
                    <Input
                      id="title"
                      placeholder="例：React useEffectで無限ループが発生する"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-base"
                    />
                  </div>

                  {/* 詳細 */}
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-base font-semibold">
                      詳細
                      <span className="ml-1 text-destructive">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      やりたいこと、試したこと、エラー内容などを詳しく書いてください
                    </p>
                    <Textarea
                      id="content"
                      placeholder="【やりたいこと】&#10;コンポーネントがマウントされた時にAPIからデータを取得したい&#10;&#10;【試したこと】&#10;useEffectの中でfetchを呼び出した&#10;&#10;【エラー内容】&#10;コンソールに「fetching...」が延々と出力される"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[240px] text-base"
                    />
                    <div className="flex gap-2 pt-2">
                      <Button type="button" variant="outline" size="sm">
                        <ImageIcon className="h-4 w-4 mr-1.5" />
                        画像を添付
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        <Code className="h-4 w-4 mr-1.5" />
                        コードを挿入
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1.5" />
                        ファイルを添付
                      </Button>
                    </div>
                  </div>

                  {/* 言語・フレームワーク */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      言語・フレームワーク
                      <span className="ml-1 text-destructive">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      関連する言語やフレームワークを選択してください（複数選択可）
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {languageTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className={cn(
                            "cursor-pointer px-3 py-1.5 text-sm transition-all",
                            selectedLanguages.includes(tag)
                              ? "border-primary bg-primary/10 text-primary"
                              : "hover:border-primary/50"
                          )}
                          onClick={() => toggleLanguage(tag)}
                        >
                          {selectedLanguages.includes(tag) && (
                            <X className="mr-1 h-3 w-3" />
                          )}
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* カテゴリ */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">カテゴリ</Label>
                    <p className="text-sm text-muted-foreground">
                      質問の種類を選択してください
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categoryTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className={cn(
                            "cursor-pointer px-3 py-1.5 text-sm transition-all",
                            selectedCategory === tag
                              ? "border-primary bg-primary/10 text-primary"
                              : "hover:border-primary/50"
                          )}
                          onClick={() =>
                            setSelectedCategory(selectedCategory === tag ? "" : tag)
                          }
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 投稿ボタン */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <Button variant="outline" onClick={() => router.back()}>
                      キャンセル
                    </Button>
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={handleSubmit}
                        disabled={!isValid}
                        size="lg"
                      >
                        質問を投稿する
                      </Button>
                      <span className="text-sm text-muted-foreground">+5pt</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* サイドパネル */}
            <div className="hidden xl:block w-80 shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* 質問のコツ */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="flex items-center gap-2 mb-3 font-semibold text-sm">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      良い質問のコツ
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
                        <div>
                          <p className="font-medium text-foreground">ゴールを明確に</p>
                          <p className="text-xs">最終的にやりたいことを書く</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
                        <div>
                          <p className="font-medium text-foreground">試したことを書く</p>
                          <p className="text-xs">すでに試した解決策を共有</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">3</span>
                        <div>
                          <p className="font-medium text-foreground">エラー内容を添付</p>
                          <p className="text-xs">エラーメッセージやスクショを貼る</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">4</span>
                        <div>
                          <p className="font-medium text-foreground">コードを共有</p>
                          <p className="text-xs">問題のあるコードを貼る</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* 注意事項 */}
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-semibold text-sm text-amber-800">投稿前の確認</h3>
                    <ul className="space-y-1 text-xs text-amber-700">
                      <li>・ 同じ質問がないか検索しましたか？</li>
                      <li>・ 機密情報は含まれていませんか？</li>
                      <li>・ エラーメッセージは正確ですか？</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ポイント獲得モーダル */}
      <PointModal
        isOpen={showPointModal}
        onClose={handleModalClose}
        points={5}
        message="質問を投稿しました！みんなからの回答を待ちましょう"
      />
    </div>
  );
}
