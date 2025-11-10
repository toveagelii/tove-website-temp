import { sanityClient } from "@/lib/sanity.client";
import { scoreProjectsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";

const ProjectContent = ({ project, isClickable }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "20px",
        marginBottom: "80px",
        cursor: isClickable ? "pointer" : "default",
        transition: "opacity 0.2s ease",
      }}
      className={isClickable ? "hover:opacity-80" : ""}
    >
      <div
        style={{
          width: "250px",
          height: "250px",
          background: "#ccc",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {project.artwork && (
          <Image
            src={urlFor(project.artwork).width(800).height(800).auto("format").url()}
            alt={project.title}
            width={250}
            height={250}
            quality={70}
          />
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        <div style={{ fontSize: "12px", fontFamily: "'Neue Haas Grotesk', sans-serif" }}>
          {project.title}
        </div>
        {project.subtitle && (
          <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            {project.subtitle}
          </div>
        )}
        <div style={{ fontSize: "10px", color: "#555", marginTop: "6px" }}>
          {project.year}
        </div>
      </div>
    </div>
  );
};

export default async function ScorePage() {
  const projects = await sanityClient.fetch(scoreProjectsQuery);

  return (
    <div style={{ paddingTop: 0, paddingRight: "20px" }}>
      {projects.map((project) => {
        if (!project.slug || !project.slug.current) {
          return (
            <div key={project._id}>
              <ProjectContent project={project} isClickable={false} />
            </div>
          );
        }

        return (
          <Link
            key={project._id}
            href={`/score/${project.slug.current}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ProjectContent project={project} isClickable={true} />
          </Link>
        );
      })}
    </div>
  );
}
