import React, { useEffect, useMemo, useState } from 'react'
import { MessageSquare, Send } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import EmployerSidebar from '../components/EmployerSidebar'
import PageHeader from '../components/PageHeader'
import { userApi } from '../api/userApi'

export default function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [contacts, setContacts] = useState([])
  const [messages, setMessages] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [isSending, setIsSending] = useState(false)
  const isEmployer = localStorage.getItem('talentlink_user_role') === 'employer'
  const currentUserId = Number(localStorage.getItem('talentlink_user_id'))

  useEffect(() => {
    Promise.all([userApi.getMessageContacts(), userApi.getMessages()])
      .then(([contactData, messageData]) => {
        setContacts(contactData || [])
        setMessages(messageData || [])
        setSelectedId(contactData?.[0]?.id || null)
      })
      .catch((loadError) => setError(loadError.message))
  }, [])

  const conversation = useMemo(() => messages.filter((message) => message.senderId === selectedId || message.recipientId === selectedId), [messages, selectedId])
  const selectedContact = contacts.find((contact) => contact.id === selectedId)

  const send = async (event) => {
    event.preventDefault()
    if (isSending || !body.trim() || !selectedId) return
    setIsSending(true)
    try {
      await userApi.sendMessage({ recipient_id: selectedId, body: body.trim() })
      const updated = await userApi.getMessages()
      setMessages(updated || [])
      setBody('')
      setError('')
    } catch (sendError) {
      setError(sendError.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-bg">
      {isEmployer ? <EmployerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /> : <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
      <div className="flex-1 min-w-0 p-4 md:p-8">
        <PageHeader title="Messages" subtitle={isEmployer ? 'Contact candidates about your opportunities' : 'Conversations with employers and recruiters'} onMenuClick={() => setSidebarOpen(true)} />
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden grid md:grid-cols-[240px_1fr] min-h-[520px]">
          <div className="border-r border-border p-3">
            <h2 className="font-semibold text-maintext px-2 py-2">Contacts</h2>
            {contacts.length ? contacts.map((contact) => <button key={contact.id} onClick={() => setSelectedId(contact.id)} className={`w-full text-left rounded-xl px-3 py-3 mt-1 ${selectedId === contact.id ? 'bg-lightpurple' : 'hover:bg-bg'}`}><p className="text-sm font-semibold text-maintext">{contact.name}</p><p className="text-xs text-subtext">{contact.email}</p></button>) : <p className="text-sm text-subtext px-2 py-4">No contacts available yet.</p>}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="border-b border-border px-5 py-4"><p className="font-semibold text-maintext">{selectedContact?.name || 'Select a contact'}</p><p className="text-xs text-subtext">{selectedContact?.role === 'talent' || selectedContact?.role === 'candidate' ? 'Candidate' : selectedContact ? 'Employer' : ''}</p></div>
            <div className="flex-1 p-5 space-y-3 overflow-y-auto">
              {conversation.length ? conversation.map((message) => <div key={message.id} className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${message.senderId === currentUserId ? 'bg-primary text-white' : 'bg-bg text-maintext'}`}><p className="text-sm">{message.body}</p><p className={`text-[11px] mt-1 ${message.senderId === currentUserId ? 'text-white/70' : 'text-subtext'}`}>{message.time}</p></div></div>) : <div className="h-full flex flex-col items-center justify-center text-center text-subtext"><MessageSquare size={28} className="mb-3" /><p className="text-sm">Start a conversation.</p></div>}
            </div>
            <form onSubmit={send} className="border-t border-border p-4 flex gap-3"><input value={body} onChange={(event) => setBody(event.target.value)} disabled={!selectedId || isSending} placeholder={selectedId ? (isSending ? 'Sending...' : 'Write a message...') : 'Select a contact first'} className="flex-1 bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus-ring focus:bg-white" /><button type="submit" disabled={!selectedId || !body.trim() || isSending} aria-label="Send message" className="h-11 w-11 rounded-xl btn-gradient text-white flex items-center justify-center disabled:opacity-50"><Send size={17} /></button></form>
          </div>
        </div>
      </div>
    </div>
  )
}