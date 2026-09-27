// Job ticket - project credits set like a workshop job docket
// Typewriter face (Courier Prime), labels in small caps, dashed dividers

interface JobTicketProps {
  jobNumber: number
  jobCount: number
  department: string
  client?: string
  agency?: string
  year?: number
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function JobTicket({ jobNumber, jobCount, department, client, agency, year }: JobTicketProps) {
  const fields = [
    { label: 'Job No.', value: `${pad(jobNumber)} / ${pad(jobCount)}` },
    { label: 'Dept.', value: department },
    client && { label: 'Client', value: client },
    agency && { label: 'Agency', value: agency },
    year && { label: 'Year', value: String(year) },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <dl className="mx-auto mb-12 flex w-fit max-w-full flex-wrap justify-center border border-gray-300 bg-surface font-mono text-sm">
      {fields.map(({ label, value }) => (
        <div
          key={label}
          className="border-dashed border-gray-300 px-4 py-2.5 text-center [&:not(:last-child)]:border-r"
        >
          <dt className="text-[0.7rem] uppercase tracking-[0.15em] text-gray-600">{label}</dt>
          <dd className="mt-0.5 text-gray-900">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
