import { sanityClient } from "@/lib/sanity.client";
import { discographyProjectsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import Image from "next/image";

export default async function DiscographyPage() {
  const projects = await sanityClient.fetch(discographyProjectsQuery);

  return (
    <main style={{ paddingLeft: "272px", paddingTop: "0", paddingRight: "20px" }}>
      <div>
        {projects.map((p) => (
          <div
            key={p._id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "20px",
              marginBottom: "20px",
              cursor: "pointer",
            }}
          >
            {/* Artwork */}
            <div
              style={{
                width: "200px",
                height: "200px",
                background: "#ccc",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              {p.artwork && (
                <Image
                  src={urlFor(p.artwork).width(800).height(800).auto("format").url()}
                  alt={p.title}
                  width={200}
                  height={200}
                  quality={100}
                />
              )}
            </div>

            {/* Text */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <div style={{ fontSize: "14px", fontFamily: "Helvetica, sans-serif" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "12px", color: "#555" }}>{p.year}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
