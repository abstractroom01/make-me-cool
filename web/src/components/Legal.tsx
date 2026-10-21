import type { ReactNode } from "react";
import { business } from "@/data/curator";

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-paper text-deep">
      <div className="mx-auto max-w-2xl px-5 py-10 md:px-8 md:py-14">
        <a href="/" className="t-caption underline">
          ← make me cool
        </a>
        <h1 className="t-headline mt-4">{title}</h1>
        <p className="t-caption mt-1 text-deep/65">last updated 21 october 2026</p>
        <div className="t-body mt-6 space-y-4 text-deep/90 [&_h2]:display [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc">
          {children}
        </div>
        <div className="t-caption mt-10 space-y-1 text-deep/65">
          <p>
            questions? write to {business.supportEmail ? <a className="underline" href={`mailto:${business.supportEmail}`}>{business.supportEmail}</a> : "us through theabstractroom.com"}.
          </p>
          {business.legalName && <p>operated by {business.legalName}.</p>}
          {business.address && <p>{business.address}</p>}
          {business.gstin && <p>gstin: {business.gstin}</p>}
          {business.grievanceContact && <p>grievance contact: {business.grievanceContact}</p>}
        </div>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <LegalShell title="privacy">
      <p>
        make me cool is made by {business.name}. this page says what we collect, why, and what you can do about it, in plain words.
      </p>
      <h2>what we collect</h2>
      <ul>
        <li>your email address, to sign you in.</li>
        <li>your name, handle and timezone, to run your profile and your days correctly.</li>
        <li>that you confirmed you are 18 or older, and when.</li>
        <li>what you do in the app: stories you finish, quiz results, points, whether you told someone and how it landed, your score and badges.</li>
        <li>payment records if you buy plus: the plan, the amount, the date and the payment reference. we never see or store your card or UPI details. razorpay handles those.</li>
        <li>simple usage events (for example, a story started or a button tapped), linked to an anonymous id or your account, so we can see what works.</li>
      </ul>
      <h2>what we don&apos;t do</h2>
      <ul>
        <li>no ads, and no advertising trackers.</li>
        <li>we don&apos;t sell your data.</li>
        <li>we don&apos;t send what you tell people, or who you tell, anywhere. the share button only opens your own share sheet or whatsapp.</li>
      </ul>
      <h2>who helps us run this</h2>
      <p>
        supabase (database, sign-in and email), vercel (hosting) and razorpay (payments). they process data for us to provide the service. our database is hosted in mumbai, india. the website itself is served through vercel&apos;s network, which may run in other countries. sign-in emails are sent through gmail.
      </p>
      <h2>how long we keep it</h2>
      <p>
        as long as you have an account. if you delete your account we delete your profile, progress and usage events. we may keep payment records for as long as the law requires us to.
      </p>
      <h2>your choices</h2>
      <ul>
        <li>you can ask us to show you, correct or delete your data at any time.</li>
        <li>you can hide your cool score in the app.</li>
        <li>the app is for people 18 and over.</li>
      </ul>
      <p>
        to delete your account today, write to us from the email you signed up with. we are building a delete button into the app.
      </p>
    </LegalShell>
  );
}

export function Terms() {
  return (
    <LegalShell title="terms">
      <p>by using make me cool you agree to these terms. they are short on purpose.</p>
      <h2>who can use it</h2>
      <p>you must be 18 or older.</p>
      <h2>what you get</h2>
      <ul>
        <li>the daily story, quiz, cool score, streak and badges are free.</li>
        <li>plus is a paid pass that unlocks the full archive and &ldquo;behind the story&rdquo;. a pass runs for a fixed time (for example 30 or 365 days), starts when you pay, and ends on its own. nothing renews automatically. nothing is charged unless you buy.</li>
        <li>the price you see is the price you pay.</li>
      </ul>
      <h2>about the stories</h2>
      <p>
        stories are for curiosity and conversation. we aim to check every claim against sources, and we label stories we haven&apos;t finished checking as samples. they are not professional advice. if you spot a mistake, tell us and we&apos;ll fix it and note the correction.
      </p>
      <h2>your account</h2>
      <p>keep your sign-in email secure. don&apos;t misuse the app, try to break it, or copy the content to sell it.</p>
      <h2>our content</h2>
      <p>the stories, illustrations and design belong to {business.name}. you can share the lines and cards the app gives you, with credit.</p>
      <h2>changes and ending</h2>
      <p>we may change the app or these terms; if a change affects what you paid for, we&apos;ll tell you first. you can stop using the app any time.</p>
      <h2>liability</h2>
      <p>we provide the app as it is. to the extent the law allows, we aren&apos;t liable for indirect losses. nothing here limits rights you have under the law that can&apos;t be limited.</p>
      <h2>law</h2>
      <p>these terms follow the laws of india.</p>
    </LegalShell>
  );
}

export function Refunds() {
  return (
    <LegalShell title="refunds">
      <p>plus is a one-time pass, so there is no subscription to cancel and nothing renews.</p>
      <ul>
        <li>if you&apos;re not happy, write to us within 7 days of paying and we&apos;ll refund you in full.</li>
        <li>if you were charged twice, or paid and didn&apos;t get plus, we&apos;ll fix it or refund you straight away.</li>
        <li>refunds go back to the way you paid, through razorpay. your bank may take several working days to show it.</li>
        <li>when a pass is refunded, the time it added to your plus is taken off.</li>
      </ul>
      <p>
        to ask, write to us with the email you signed in with and the payment reference from the billing page.
      </p>
    </LegalShell>
  );
}
