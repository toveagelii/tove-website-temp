import { sanityClient } from '@/lib/sanity.client';
import { contactPageQuery } from '@/lib/queries';

export default async function ContactPage() {
  // Fetch contact content from Sanity
  const data = await sanityClient.fetch(contactPageQuery).catch(() => null);

  const emails = Array.isArray(data?.emails) ? data.emails : [];
  return (
    <div style={{ paddingTop: 0, paddingRight: '20px' }}>
      {/* Render all emails from Sanity */}
      {emails.length > 0 && emails.map((item, idx) => (
        <div key={idx} style={{ marginBottom: '16px' }}>
          {item.label ? (
            <p style={{ marginBottom: '4px', fontSize: '12px', color: 'var(--foreground)', fontFamily: "'Neue Haas Grotesk', sans-serif" }}>
              {item.label}
            </p>
          ) : null}
          <a
            href={`mailto:${item.email}`}
            aria-label={`Email ${item.email}`}
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "'Neue Haas Grotesk', sans-serif",
              color: '#666',
              textDecoration: 'underline',
              fontSize: '12px',
              display: 'block'
            }}
          >
            {item.email}
          </a>
        </div>
      ))}
    </div>
  );
}