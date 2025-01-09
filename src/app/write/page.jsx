"use client";
import Image from "next/image";
import styles from "./write.module.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/supabase";

export default function WritePage() {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");

  useEffect(() => {
    if (file) {
      uploadFileToSupabase(file);
    }
  }, [file]);

  const uploadFileToSupabase = async (file) => {
    try {
      const filePath = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) {
        console.error("Upload failed:", error);
        return;
      }

      // ✅ Get Public URL of Uploaded File
      const publicUrl = supabase.storage
        .from("images")
        .getPublicUrl(data.path).publicUrl;

      setMedia(publicUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
    console.log(res);
    console.log(res.json());
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className={styles.input}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="add" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              style={{ display: "none" }}
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="add" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="add" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="add" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your Story...."
        />
      </div>
      <button onClick={handleSubmit} className={styles.publish}>
        Publish
      </button>
    </div>
  );
}
