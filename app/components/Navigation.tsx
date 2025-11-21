"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{ href: "/score", label: "Score & Sound" },
	{ href: "/discography", label: "Discography" },
	{ href: "/contact", label: "Contact" },
];

export default function Navigation() {
	const pathname = usePathname();
			return (
					<nav>
						<div className="navigation-list" style={{ fontFamily: "'Neue Haas Grotesk Display Pro 45 Light', Arial, Helvetica, sans-serif", fontWeight: 300 }}>
							{navItems.map((item, idx) => {
								const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
								return (
									<Link
										key={item.href}
										href={item.href}
										className="hover:opacity-70 transition-opacity"
										style={{
											textDecoration: "none",
											color: active ? "#666" : "var(--foreground)",
											fontSize: "12px",
											display: "block",
											marginBottom: idx === navItems.length - 1 ? 0 : "4px",
										}}
									>
										{item.label}
									</Link>
								);
							})}
						</div>
					</nav>
			);
}
