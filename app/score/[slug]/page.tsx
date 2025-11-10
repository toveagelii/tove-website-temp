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
      {/* Uploaded Videos Section */}
      {project.videos && project.videos.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {project.videos.map((video: any, index: number) => {
              if (!video.videoFile?.asset?.url) return null;

              // Request a 2x retina thumbnail (500 CSS px -> 1000 actual px) and auto-format for sharpness
              const thumbnailUrl = video.thumbnail
                ? urlFor(video.thumbnail).width(1000).auto("format").quality(90).url()
                : undefined;

              return (
                <video
                  key={index}
                  controls
                  poster={thumbnailUrl}
                  className="score-video"
                  style={{
                    width: "500px",
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                  }}
                >
                  <source src={video.videoFile.asset.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              );
            })}
          </div>
        </div>
      )}

      {/* YouTube Videos Section */}
      {project.youtubeVideos && project.youtubeVideos.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {project.youtubeVideos.map((video: { url: string }, index: number) => {
              const embedUrl = getYouTubeEmbedUrl(video.url);
              if (!embedUrl) return null;

              return (
                <div
                  key={index}
                  className="youtube-container"
                  style={{
                    position: "relative",
                    width: "500px",
                    maxWidth: "100%",
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

      {/* Project Title */}
      <h1
        className="score-text-content"
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
          className="score-text-content"
          style={{
            fontSize: "11px",
            color: "#666",
            marginBottom: "16px",
            fontFamily: "'Neue Haas Grotesk', sans-serif",
            maxWidth: "500px",
          }}
        >
          {project.subtitle}
        </p>
      )}

      {/* Description */}
      {project.description && (
        <p
          className="score-text-content"
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
              className="score-text-content"
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

      <style jsx>{`
        @media (max-width: 768px) {
          .score-video {
            width: 100% !important;
          }
          
          .youtube-container {
            width: 100% !important;
          }
          
          .score-text-content {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
