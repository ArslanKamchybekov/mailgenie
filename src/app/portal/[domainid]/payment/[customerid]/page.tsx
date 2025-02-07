import { onDomainCustomerResponses } from "@/actions/appointment"
import { onGetDomainProductsAndConnectedAccountId } from "@/actions/payments"
import PortalForm from "@/components/forms/portal/portal-form"

type PageProps = {
  params: Promise<{ domainid: string; customerid: string }>
}

export default async function CustomerPaymentPage({ params }: PageProps) {
  const { domainid, customerid } = await params

  const questions = await onDomainCustomerResponses(customerid)
  const products = await onGetDomainProductsAndConnectedAccountId(domainid)

  return (
    <PortalForm
      email={questions.email!}
      products={products?.products}
      amount={products?.amount}
      domainid={domainid}
      customerId={customerid}
      questions={questions.questions}
      stripeId={products?.stripeId!}
      type="Payment"
    />
  )
}

