import { sanityClient } from "@/lib/sanity.client";
import { projectBySlugQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import Image from "next/image";

// Helper function to extract YouTube video ID from URL
function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    let videoId = null;

    // Handle youtube.com/watch?v=VIDEO_ID
    if (urlObj.hostname.includes('youtube.com')) {
      videoId = urlObj.searchParams.get('v');
    }
    // Handle youtu.be/VIDEO_ID
    else if (urlObj.hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.slice(1);
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (e) {
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await sanityClient.fetch(projectBySlugQuery(slug));

  if (!project) {
    return <div style={{ padding: "20px" }}>Project not found</div>;
  }

  return (
    <div style={{ paddingTop: 0, paddingRight: "20px", maxWidth: "800px" }}>
      {/* Artwork */}
      {project.artwork && (
        <div style={{ marginBottom: "20px" }}>
          <Image
            src={urlFor(project.artwork).width(800).height(800).auto("format").url()}
            alt={project.title}
            width={500}
            height={500}
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}

      {/* Project Title */}
      <h1
        style={{
          fontSize: "13px",
          fontFamily: "'Neue Haas Grotesk', sans-serif",
          marginBottom: "8px",
          maxWidth: "500px",
        }}
      >
        {project.title}
      </h1>

      {/* Subtitle */}
      {project.subtitle && (
        <p
          style={{
            fontSize: "11px",
            color: "#666",
            marginBottom: "4px",
            fontFamily: "'Neue Haas Grotesk', sans-serif",
            maxWidth: "500px",
          }}
        >
          {project.subtitle}
        </p>
      )}

      {/* Year */}
      <p
        style={{
          fontSize: "10px",
          color: "#555",
          marginBottom: "24px",
          fontFamily: "'Neue Haas Grotesk', sans-serif",
          maxWidth: "500px",
        }}
      >
        {project.year}
      </p>

      {/* Description */}
      {project.description && (
        <p
          style={{
            fontSize: "11px", // match subtitle size
            fontFamily: "'Neue Haas Grotesk', sans-serif",
            lineHeight: "1.6",
            marginBottom: "32px",
            whiteSpace: "pre-wrap",
            maxWidth: "500px",
          }}
        >
          {project.description}
        </p>
      )}

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
          {project.links.map((link: { title: string; url: string }, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "11px",
                textDecoration: "underline",
                maxWidth: "500px",
                display: "inline-block",
              }}
            >
              {link.title || link.url}
            </a>
          ))}
        </div>
      )}

      {/* YouTube Videos Section */}
      {project.youtubeVideos && project.youtubeVideos.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {project.youtubeVideos.map((video: { url: string }, index: number) => {
              const embedUrl = getYouTubeEmbedUrl(video.url);
              if (!embedUrl) return null;

              return (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    width: "500px",
                    paddingBottom: "281.25px", // 16:9 aspect ratio for 500px width (500 * 9/16 = 281.25)
                    height: 0,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src={embedUrl}
                    title={`YouTube video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
