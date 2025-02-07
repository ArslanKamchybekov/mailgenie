import { onDomainCustomerResponses, onGetAllDomainBookings } from "@/actions/appointment"
import PortalForm from "@/components/forms/portal/portal-form"

type Props = {
  params: Promise<{ domainid: string; customerid: string }>
}

export default async function CustomerSignUpForm({ params }: Props) {
  const { domainid, customerid } = await params

  const questions = await onDomainCustomerResponses(customerid)
  const bookings = await onGetAllDomainBookings(domainid)

  if (!questions) return null

  return (
    <PortalForm
      bookings={bookings}
      email={questions.email!}
      domainid={domainid}
      customerId={customerid}
      questions={questions.questions}
      type="Appointment"
    />
  )
}

