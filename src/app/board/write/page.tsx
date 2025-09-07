"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";

export default function WritePage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!title.trim() || !author.trim() || !content.trim()) {
            setError("제목/작성자/내용을 모두 입력해주세요.");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch("/api/board", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title, author, content}),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.message || `HTTP ${res.status}`);
            }
            const created = await res.json();
            router.push(`/board/${created.id}`);
            router.refresh();
        } catch (err: any) {
            setError(err.message ?? "등록 중 오류가 발생했습니다.");
            setSubmitting(false);
        }
    }

    return (
        <section>
            <h2>새 글 쓰기</h2>
            <form onSubmit={onSubmit} style={{display: "grid", gap: 12, marginTop: 12}}>
                <input
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{padding: 8, border: "1px solid #ccc", borderRadius: 6}}
                />
                <input
                    placeholder="작성자"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    style={{padding: 8, border: "1px solid #ccc", borderRadius: 6}}
                />
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    style={{padding: 8, border: "1px solid #ccc", borderRadius: 6}}
                />
                {error && <div style={{color: "crimson"}}>{error}</div>}
                <div style={{display: "flex", gap: 8}}>
                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            padding: "8px 14px",
                            borderRadius: 6,
                            border: "1px solid #222",
                            background: submitting ? "#ddd" : "#fff",
                            cursor: submitting ? "not-allowed" : "pointer",
                        }}
                    >
                        {submitting ? "등록 중..." : "등록"}
                    </button>
                    <a href="/board" style={{alignSelf: "center"}}>취소</a>
                </div>
            </form>
        </section>
    );
}
